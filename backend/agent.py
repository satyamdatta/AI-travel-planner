from dotenv import load_dotenv

from langgraph.graph import StateGraph, END

from langchain_groq import ChatGroq

from state import TravelState

from tools import (
    extract_trip_details,
    allocate_budget,
    calculator,
    search_attractions,
    search_hotels,
)

load_dotenv()

llm = ChatGroq(model="llama-3.1-8b-instant")


# ----------------------------------
# EXTRACT DESTINATION NODE
# ----------------------------------


def extract_destination_node(state):

    logs = state["logs"]
    tool_calls = state["tool_calls"]

    details = extract_trip_details(state["query"])

    destination = details["destination"]
    budget = int(details["budget"])

    logs.append("🔍 Parsing travel request")

    logs.append(f"🏔 Destination identified: {destination}")

    logs.append(f"💰 Budget detected: ₹{budget:,}")

    tool_calls.append(
        {
            "tool": "Extract Destination",
            "input": state["query"],
            "output": details,
        }
    )

    return {
        **state,
        "destination": destination,
        "budget": budget,
        "logs": logs,
        "tool_calls": tool_calls,
    }


# ----------------------------------
# ALLOCATE BUDGET NODE
# ----------------------------------


def allocate_budget_node(state):

    logs = state["logs"]
    tool_calls = state["tool_calls"]

    allocation = allocate_budget(state["destination"], state["budget"])

    logs.append("💰 Allocating budget across categories")

    logs.append(f"✈ Flights: ₹{allocation['flight_cost']:,}")

    logs.append(f"🏨 Hotels: ₹{allocation['hotel_cost']:,}")

    logs.append(f"🍔 Food: ₹{allocation['food_cost']:,}")

    logs.append(f"🚕 Transport: ₹{allocation['travel_cost']:,}")

    logs.append(f"🎡 Activities: ₹{allocation['activities_cost']:,}")

    tool_calls.append(
        {
            "tool": "Budget Allocator",
            "input": {
                "destination": state["destination"],
                "budget": state["budget"],
            },
            "output": allocation,
        }
    )

    return {
        **state,
        "allocation": allocation,
        "logs": logs,
        "tool_calls": tool_calls,
    }


# ----------------------------------
# VALIDATE BUDGET NODE
# ----------------------------------


def validate_budget_node(state):

    logs = state["logs"]
    tool_calls = state["tool_calls"]

    total = calculator(state["allocation"])

    logs.append("🧮 Verifying allocation totals")

    logs.append(f"✅ Total allocated: ₹{total:,}")

    logs.append("✅ Budget check passed")

    tool_calls.append(
        {
            "tool": "Calculator",
            "input": state["allocation"],
            "output": total,
        }
    )

    return {
        **state,
        "total_cost": total,
        "logs": logs,
        "tool_calls": tool_calls,
    }


# ----------------------------------
# SEARCH ATTRACTIONS NODE
# ----------------------------------


def search_attractions_node(state):

    logs = state["logs"]
    tool_calls = state["tool_calls"]

    attractions = search_attractions(state["destination"])

    logs.append(f"🌍 Searching attractions in {state['destination']}")

    for attraction in attractions[:3]:

        logs.append(f"📍 Found: {attraction}")

    logs.append(f"✅ {len(attractions)} attractions found")

    tool_calls.append(
        {
            "tool": "Attraction Search",
            "input": state["destination"],
            "output": attractions,
        }
    )

    return {
        **state,
        "attractions": attractions,
        "logs": logs,
        "tool_calls": tool_calls,
    }


# ----------------------------------
# SEARCH HOTELS NODE
# ----------------------------------


def search_hotels_node(state):

    logs = state["logs"]
    tool_calls = state["tool_calls"]

    hotels = search_hotels(state["destination"], state["budget"])

    logs.append(f"🏨 Searching hotels in {state['destination']}")

    for hotel in hotels[:3]:

        logs.append(f"🏨 Candidate: {hotel}")

    logs.append(f"✅ {len(hotels)} hotels found")

    tool_calls.append(
        {
            "tool": "Hotel Search",
            "input": state["destination"],
            "output": hotels,
        }
    )

    return {
        **state,
        "hotels": hotels,
        "logs": logs,
        "tool_calls": tool_calls,
    }


# ----------------------------------
# RESPONSE NODE
# ----------------------------------


def response_node(state):

    state["logs"].append("📝 Building itinerary")

    state["logs"].append("📅 Creating day-wise travel plan")

    allocation = state["allocation"]

    attractions = "\n".join(state["attractions"])

    prompt = f"""
    Create a travel itinerary.

    Destination:
    {state["destination"]}

    Total Budget:
    ₹{state["budget"]}

    Budget Allocation:

    Flights:
    ₹{allocation["flight_cost"]}

    Hotels:
    ₹{allocation["hotel_cost"]}

    Food:
    ₹{allocation["food_cost"]}

    Local Transport:
    ₹{allocation["travel_cost"]}

    Activities:
    ₹{allocation["activities_cost"]}

    Misc:
    ₹{allocation["misc_cost"]}

    Attractions:

    {attractions}

    Rules:

    1. Use ONLY these attractions
    2. Do NOT create a new budget
    3. Do NOT exceed the allocation
    4. Create a realistic day-wise itinerary
    5. Include hotels, food and activities
    """

    response = llm.invoke(prompt)

    state["logs"].append("✅ Itinerary generated")

    state["logs"].append("🎉 Travel plan ready")

    return {**state, "final_response": response.content}


# ----------------------------------
# GRAPH
# ----------------------------------

graph = StateGraph(TravelState)

graph.add_node("extract_destination", extract_destination_node)

graph.add_node("allocate_budget", allocate_budget_node)

graph.add_node("validate_budget", validate_budget_node)

graph.add_node("search_attractions", search_attractions_node)

graph.add_node("search_hotels", search_hotels_node)

graph.add_node("response", response_node)

graph.set_entry_point("extract_destination")

graph.add_edge("extract_destination", "allocate_budget")

graph.add_edge("allocate_budget", "validate_budget")

graph.add_edge("validate_budget", "search_attractions")

graph.add_edge("search_attractions", "search_hotels")

graph.add_edge("search_hotels", "response")

graph.add_edge("response", END)

travel_agent = graph.compile()
