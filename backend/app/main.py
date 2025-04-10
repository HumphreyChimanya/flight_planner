from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from .pathfinder import load_airspace_graph, find_shortest_path
from .flight_plans import FlightPlan
from .eta import calculate_eta_by_aircraft
from .constants import AIRCRAFT_CRUISE_SPEEDS  

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

#saving flight details
@app.post("/flight_plans")
def save_flight_plan(plan: FlightPlan):
    flight_plans.append(plan)
    return {"status": "saved", "flight_id": plan.flight_id}

#calclating ETA
@app.get("/eta/aircraft")
def get_eta_aircraft(distance: float, aircraft: str, wind: float = 0.0):
    try:
        eta = calculate_eta_by_aircraft(distance, aircraft, wind)
        return {
            "aircraft": aircraft,
            "distance_km": distance,
            "wind_adjustment_kmh": wind,
            "eta_hours": eta
        }
    except ValueError as e:
        return {"error": str(e)}
