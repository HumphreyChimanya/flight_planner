import { FormEvent, useState } from "react";
import { usePlanRoute } from "../hooks/useFlightPlanner";
import { usePlannerStore } from "../hooks/usePlannerStore";

const initialForm = {
  origin: "",
  destination: ""
};

export const RoutePlanner = () => {
  const [form, setForm] = useState(initialForm);
  const { mutate, isPending, isError, error } = usePlanRoute();
  const lastRoute = usePlannerStore((state) => state.lastRoute);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.origin || !form.destination) {
      return;
    }
    mutate({
      origin: form.origin.toUpperCase(),
      destination: form.destination.toUpperCase()
    });
  };

  return (
    <section className="card">
      <header className="card__header">
        <div>
          <h2>Route planner</h2>
          <p>Query the FastAPI backend for a shortest-path route.</p>
        </div>
        <div className="badge">/plan-route</div>
      </header>
      <form className="form-grid" onSubmit={handleSubmit}>
        <label className="form-field">
          <span>Origin (ICAO)</span>
          <input
            type="text"
            placeholder="e.g. KJFK"
            value={form.origin}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, origin: event.target.value }))
            }
            maxLength={4}
            required
          />
        </label>
        <label className="form-field">
          <span>Destination (ICAO)</span>
          <input
            type="text"
            placeholder="e.g. KLAX"
            value={form.destination}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, destination: event.target.value }))
            }
            maxLength={4}
            required
          />
        </label>
        <div className="form-actions">
          <button type="submit" disabled={isPending}>
            {isPending ? "Calculating…" : "Plan route"}
          </button>
          <button
            type="button"
            className="ghost"
            onClick={() => setForm(initialForm)}
            disabled={isPending}
          >
            Reset
          </button>
        </div>
      </form>
      <div className="divider" />
      {isError ? (
        <p className="error">
          {(error as Error)?.message ?? "Unable to compute the route."}
        </p>
      ) : null}
      {lastRoute ? (
        <div className="result">
          <div>
            <p className="result__label">Path</p>
            <p className="result__value">{lastRoute.path.join(" → ")}</p>
          </div>
          <div>
            <p className="result__label">Total distance</p>
            <p className="result__value">
              {lastRoute.total_distance.toFixed(1)} km
            </p>
          </div>
        </div>
      ) : (
        <p className="muted">Run a query to see the plotted route.</p>
      )}
    </section>
  );
};

