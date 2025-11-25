import { FlightPlanForm } from "./components/FlightPlanForm";
import { Layout } from "./components/Layout";
import { RoutePlanner } from "./components/RoutePlanner";
import { ETAEstimator } from "./components/ETAEstimator";
import { SavedPlans } from "./components/SavedPlans";

const App = () => {
  return (
    <Layout
      title="Flight Planner Control Surface"
      subtitle="Plan routes, estimate ETAs, and save plans against the FastAPI backend."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <RoutePlanner />
        <ETAEstimator />
        <FlightPlanForm />
        <SavedPlans />
      </div>
    </Layout>
  );
};

export default App;

