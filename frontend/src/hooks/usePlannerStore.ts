import { create } from "zustand";
import { FlightPlan, RouteResponse } from "../api/types";

type PlannerState = {
  lastRoute?: RouteResponse;
  setLastRoute: (route?: RouteResponse) => void;
  savedPlans: FlightPlan[];
  addSavedPlan: (plan: FlightPlan) => void;
};

export const usePlannerStore = create<PlannerState>((set) => ({
  lastRoute: undefined,
  savedPlans: [],
  setLastRoute: (route) => set({ lastRoute: route }),
  addSavedPlan: (plan) =>
    set((state) => ({
      savedPlans: [plan, ...state.savedPlans].slice(0, 5)
    }))
}));

