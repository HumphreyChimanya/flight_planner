from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from .pathfinder import load_airspace_graph, find_shortest_path
from .flight_plans import FlightPlan 

app = FastAPI()
graph = load_airspace_graph()

class RouteRequest(BaseModel):
    origin: str
    destination: str

@app.post("/plan-route")
def plan_route(req: RouteRequest):
    result = find_shortest_path(graph, req.origin.upper(), req.destination.upper())
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

flight_plans = []

@app.post("/flight_plans")
def save_flight_plan(plan: FlightPlan):
    flight_plans.append(plan)
    return {"status": "saved", "flight_id": plan.flight_id}
