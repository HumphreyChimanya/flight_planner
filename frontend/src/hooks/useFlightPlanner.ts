import { useMutation } from "@tanstack/react-query";
import { fetchEta, planRoute, saveFlightPlan } from "../api/client";
import { FlightPlan, RouteRequest } from "../api/types";
import { usePlannerStore } from "./usePlannerStore";

export const usePlanRoute = () => {
  const setLastRoute = usePlannerStore((state) => state.setLastRoute);
  return useMutation({
    mutationFn: (payload: RouteRequest) => planRoute(payload),
    onSuccess: (data) => setLastRoute(data)
  });
};

export const useSaveFlightPlan = () => {
  const addSavedPlan = usePlannerStore((state) => state.addSavedPlan);
  return useMutation({
    mutationFn: (payload: FlightPlan) => saveFlightPlan(payload),
    onSuccess: (_, variables) => addSavedPlan(variables)
  });
};

export const useCalculateETA = () => {
  return useMutation({
    mutationFn: fetchEta
  });
};

