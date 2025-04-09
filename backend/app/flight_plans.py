from pydantic import BaseModel

class FlightPlan(BaseModel):
    flight_id: str
    aircraft: str
    source: str
    destination: str
    route: list[str]
