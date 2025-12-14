import { usePlannerStore } from "../hooks/usePlannerStore";

export const SavedPlans = () => {
  const savedPlans = usePlannerStore((state) => state.savedPlans);

  return (
    <section className="card">
      <header className="card__header">
        <div>
          <h2>Recent plans (local cache)</h2>
          <p>Quick sanity check until a persistent store is added.</p>
        </div>
      </header>
      {savedPlans.length === 0 ? (
        <p className="muted">Save a plan to see it listed here.</p>
      ) : (
        <ul className="plans">
          {savedPlans.map((plan) => (
            <li key={plan.flight_id}>
              <div>
                <p className="plan__title">
                  {plan.flight_id} · {plan.aircraft}
                </p>
                <p className="plan__meta">
                  {plan.source} → {plan.destination}
                </p>
              </div>
              <div className="plan__route">{plan.route.join(" → ")}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};



