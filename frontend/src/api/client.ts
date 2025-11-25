import axios from "axios";
import {
  RouteRequest,
  RouteResponse,
  FlightPlan,
  SaveFlightPlanResponse,
  ETAResponse
} from "./types";

const apiBase =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "/api";

export const api = axios.create({
  baseURL: apiBase,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10_000
});

export const planRoute = async (
  payload: RouteRequest
): Promise<RouteResponse> => {
  const { data } = await api.post<RouteResponse>("/plan-route", payload);
  return data;
};

export const saveFlightPlan = async (
  payload: FlightPlan
): Promise<SaveFlightPlanResponse> => {
  const { data } = await api.post<SaveFlightPlanResponse>(
    "/flight_plans",
    payload
  );
  return data;
};

export const fetchEta = async (params: {
  distance: number;
  aircraft: string;
  wind?: number;
}): Promise<ETAResponse> => {
  const { data } = await api.get<ETAResponse>("/eta/aircraft", {
    params: {
      distance: params.distance,
      aircraft: params.aircraft,
      wind: params.wind ?? 0
    }
  });
  return data;
};

