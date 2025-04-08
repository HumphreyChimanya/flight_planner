from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from .pathfinder import load_airspace_graph, find_shortest_path

app = FastAPI()
graph = load_airspace_graph("data/airspace_graph.json")

class RouteRequest(BaseModel):
    origin: str
    destination: str

@app.post("/plan-route")
def plan_route(req: RouteRequest):
    result = find_shortest_path(graph, req.origin.upper(), req.destination.upper())
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result
