export type RouteRequest = {
  origin: string;
  destination: string;
};

export type RouteResponse = {
  path: string[];
  total_distance: number;
};

export type FlightPlan = {
  flight_id: string;
  aircraft: string;
  source: string;
  destination: string;
  route: string[];
};

export type SaveFlightPlanResponse = {
  status: string;
  flight_id: string;
};

export type ETAResponse = {
  aircraft: string;
  distance_km: number;
  wind_adjustment_kmh: number;
  eta_hours: number;
};

