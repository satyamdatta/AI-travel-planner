from typing import TypedDict


class TravelState(TypedDict):

    # User Query
    query: str

    # Extracted Data
    destination: str
    budget: int

    # Budget Allocation
    allocation: dict

    # Validation
    total_cost: int

    # Attractions
    attractions: list

    # UI
    logs: list
    tool_calls: list

    # Final Output
    final_response: str