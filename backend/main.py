from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from starlette.websockets import WebSocketDisconnect

import asyncio

from agent import (
    travel_agent,
    extract_destination_node,
    allocate_budget_node,
    validate_budget_node,
    search_attractions_node,
    search_hotels_node,
    response_node
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://ai-travel-planner-1-e73a.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class UserQuery(BaseModel):
    query: str


@app.get("/")
def home():
    return {
        "message": "Travel Agent Running"
    }


@app.post("/chat")
def chat(data: UserQuery):

    state = {
        "query": data.query,

        "destination": "",
        "budget": 0,

        "allocation": {},
        "total_cost": 0,

        "attractions": [],
        "hotels": [],

        "logs": [],
        "tool_calls": [],

        "final_response": ""
    }

    return travel_agent.invoke(state)


# ----------------------------------
# SEND NEW LOGS
# ----------------------------------

async def send_new_logs(
    websocket,
    state,
    last_index
):

    new_logs = state["logs"][last_index:]

    for log in new_logs:

        await websocket.send_json({
            "type": "log",
            "message": log
        })

        await asyncio.sleep(0.25)

    return len(state["logs"])


# ----------------------------------
# WEBSOCKET
# ----------------------------------

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):

    await websocket.accept()

    print("WebSocket Connected")

    try:

        while True:

            data = await websocket.receive_json()

            print("Received Query:", data)

            state = {
                "query": data["query"],

                "destination": "",
                "budget": 0,

                "allocation": {},
                "total_cost": 0,

                "attractions": [],
                "hotels": [],

                "logs": [],
                "tool_calls": [],

                "final_response": ""
            }

            log_index = 0

            # -------------------
            # RESET GRAPH
            # -------------------

            for step in [
                "parse",
                "extract",
                "allocate",
                "validate",
                "search",
                "hotels",
                "itinerary",
                "final"
            ]:

                await websocket.send_json({
                    "type": "step",
                    "step": step,
                    "status": "pending"
                })

            # -------------------
            # PARSE
            # -------------------

            await websocket.send_json({
                "type": "step",
                "step": "parse",
                "status": "running"
            })

            await asyncio.sleep(0.3)

            await websocket.send_json({
                "type": "step",
                "step": "parse",
                "status": "success"
            })

            # -------------------
            # EXTRACT
            # -------------------

            await websocket.send_json({
                "type": "step",
                "step": "extract",
                "status": "running"
            })

            state = extract_destination_node(
                state
            )

            log_index = await send_new_logs(
                websocket,
                state,
                log_index
            )

            await websocket.send_json({
                "type": "tool",
                "data": state["tool_calls"][-1]
            })

            await asyncio.sleep(0.4)

            await websocket.send_json({
                "type": "step",
                "step": "extract",
                "status": "success"
            })

            # -------------------
            # ALLOCATE
            # -------------------

            await websocket.send_json({
                "type": "step",
                "step": "allocate",
                "status": "running"
            })

            state = allocate_budget_node(
                state
            )

            log_index = await send_new_logs(
                websocket,
                state,
                log_index
            )

            await websocket.send_json({
                "type": "tool",
                "data": state["tool_calls"][-1]
            })

            await asyncio.sleep(0.5)

            await websocket.send_json({
                "type": "step",
                "step": "allocate",
                "status": "success"
            })

            # -------------------
            # VALIDATE
            # -------------------

            await websocket.send_json({
                "type": "step",
                "step": "validate",
                "status": "running"
            })

            state = validate_budget_node(
                state
            )

            log_index = await send_new_logs(
                websocket,
                state,
                log_index
            )

            await websocket.send_json({
                "type": "tool",
                "data": state["tool_calls"][-1]
            })

            await asyncio.sleep(0.4)

            await websocket.send_json({
                "type": "step",
                "step": "validate",
                "status": "success"
            })

            # -------------------
            # ATTRACTIONS
            # -------------------

            await websocket.send_json({
                "type": "step",
                "step": "search",
                "status": "running"
            })

            state = search_attractions_node(
                state
            )

            log_index = await send_new_logs(
                websocket,
                state,
                log_index
            )

            await websocket.send_json({
                "type": "tool",
                "data": state["tool_calls"][-1]
            })

            await asyncio.sleep(0.6)

            await websocket.send_json({
                "type": "step",
                "step": "search",
                "status": "success"
            })

            # -------------------
            # HOTELS
            # -------------------

            await websocket.send_json({
                "type": "step",
                "step": "hotels",
                "status": "running"
            })

            state = search_hotels_node(
                state
            )

            log_index = await send_new_logs(
                websocket,
                state,
                log_index
            )

            await websocket.send_json({
                "type": "tool",
                "data": state["tool_calls"][-1]
            })

            await asyncio.sleep(0.6)

            await websocket.send_json({
                "type": "step",
                "step": "hotels",
                "status": "success"
            })

            # -------------------
            # ITINERARY
            # -------------------

            await websocket.send_json({
                "type": "step",
                "step": "itinerary",
                "status": "running"
            })

            state = response_node(
                state
            )

            log_index = await send_new_logs(
                websocket,
                state,
                log_index
            )

            await asyncio.sleep(0.6)

            await websocket.send_json({
                "type": "step",
                "step": "itinerary",
                "status": "success"
            })

            # -------------------
            # FINAL
            # -------------------

            await websocket.send_json({
                "type": "step",
                "step": "final",
                "status": "running"
            })

            await websocket.send_json({
                "type": "final",
                "message": state["final_response"]
            })

            await websocket.send_json({
                "type": "step",
                "step": "final",
                "status": "success"
            })

            print("Final response sent")

    except WebSocketDisconnect:

        print("Client disconnected")