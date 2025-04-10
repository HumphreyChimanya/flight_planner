
def calculate_eta_by_aircraft(distance_km: float, aircraft: str, wind_speed: float = 0.0) -> float:
    cruise_speed = AIRCRAFT_CRUISE_SPEEDS.get(aircraft)

    if not cruise_speed:
        raise ValueError(f"Cruise speed not found for aircraft type: {aircraft}")
    
    # Adjust speed based on wind (positive = tailwind, negative = headwind)
    adjusted_speed = cruise_speed + wind_speed
    
    if adjusted_speed <= 0:
        raise ValueError("Effective speed must be greater than zero after wind adjustment")
    
    eta_hours = distance_km / adjusted_speed
    return round(eta_hours, 2)
