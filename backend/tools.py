from langchain_groq import ChatGroq
from dotenv import load_dotenv
import json

load_dotenv()

llm = ChatGroq(
    model="llama-3.1-8b-instant"
)


# -----------------------------
# EXTRACT DESTINATION + BUDGET
# -----------------------------

def extract_trip_details(query):

    prompt = f"""
    Extract destination and budget.

    Query:
    {query}

    Return ONLY valid JSON.

    Do not wrap JSON in markdown.

    Do not use ```json.

    Example:

    {{
        "destination": "Goa",
        "budget": 25000
    }}
    """

    response = llm.invoke(prompt)

    content = response.content.strip()

    content = (
        content
        .replace("```json", "")
        .replace("```", "")
        .strip()
    )

    print("\n====================")
    print("EXTRACT RESPONSE")
    print("====================")
    print(content)

    data = json.loads(content)

    return data


# -----------------------------
# ALLOCATE BUDGET
# -----------------------------

def allocate_budget(destination, budget):

    flight_cost = int(budget * 0.25)
    hotel_cost = int(budget * 0.35)
    food_cost = int(budget * 0.15)
    travel_cost = int(budget * 0.10)
    activities_cost = int(budget * 0.10)

    allocated = (
        flight_cost
        + hotel_cost
        + food_cost
        + travel_cost
        + activities_cost
    )

    misc_cost = budget - allocated

    return {
        "destination": destination,
        "budget": budget,
        "flight_cost": flight_cost,
        "hotel_cost": hotel_cost,
        "food_cost": food_cost,
        "travel_cost": travel_cost,
        "activities_cost": activities_cost,
        "misc_cost": misc_cost
    }


# -----------------------------
# VALIDATE BUDGET
# -----------------------------

def calculator(data):

    total = (
        int(data["flight_cost"])
        + int(data["hotel_cost"])
        + int(data["food_cost"])
        + int(data["travel_cost"])
        + int(data["activities_cost"])
        + int(data["misc_cost"])
    )

    return total


# -----------------------------
# SEARCH ATTRACTIONS
# -----------------------------

def search_attractions(destination):

    prompt = f"""
    Give top 5 tourist attractions in {destination}.

    Return ONLY JSON.

    Example:

    {{
        "attractions": [
            "Attraction 1",
            "Attraction 2",
            "Attraction 3",
            "Attraction 4",
            "Attraction 5"
        ]
    }}
    """

    response = llm.invoke(prompt)

    content = response.content.strip()

    print("\n====================")
    print("ATTRACTIONS RESPONSE")
    print("====================")
    print(content)

    data = json.loads(content)

    return data["attractions"]

# -----------------------------
# SEARCH HOTELS
# -----------------------------

def search_hotels(destination, budget):

    prompt = f"""
    Give 5 hotels in {destination}.

    Return ONLY JSON.

    Example:

    {{
        "hotels": [
            "Hotel 1",
            "Hotel 2",
            "Hotel 3",
            "Hotel 4",
            "Hotel 5"
        ]
    }}
    """

    response = llm.invoke(prompt)

    content = (
        response.content
        .replace("```json", "")
        .replace("```", "")
        .strip()
    )

    data = json.loads(content)

    return data["hotels"]