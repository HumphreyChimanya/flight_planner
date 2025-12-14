import { FormEvent, useMemo, useState } from "react";
import { usePlannerStore } from "../hooks/usePlannerStore";
import { useSaveFlightPlan } from "../hooks/useFlightPlanner";

const aircraftOptions = [
  "A320",
  "B737",
  "Cessna172",
  "Embraer190",
  "B787"
];

const initialState = {
  flight_id: "",
  aircraft: aircraftOptions[0],
  source: "",
  destination: ""
};

export const FlightPlanForm = () => {
  const { lastRoute } = usePlannerStore();
  const [form, setForm] = useState(initialState);
  const { mutate, isPending, isSuccess } = useSaveFlightPlan();

  const route = useMemo(() => lastRoute?.path ?? [], [lastRoute]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.flight_id || !form.source || !form.destination) {
      return;
    }
    mutate({
      ...form,
      source: form.source.toUpperCase(),
      destination: form.destination.toUpperCase(),
      route
    });
  };

  return (
    <section className="card">
      <header className="card__header">
        <div>
          <h2>Save flight plan</h2>
          <p>
            Persist structured flight plans; keeps a local preview until a real
            database is wired in.
          </p>
        </div>
        <div className="badge">/flight_plans</div>
      </header>
      <form className="form-grid" onSubmit={handleSubmit}>
        <label className="form-field">
          <span>Flight ID</span>
          <input
            type="text"
            placeholder="e.g. ATC123"
            value={form.flight_id}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, flight_id: e.target.value }))
            }
            required
          />
        </label>
        <label className="form-field">
          <span>Aircraft</span>
          <select
            value={form.aircraft}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, aircraft: e.target.value }))
            }
          >
            {aircraftOptions.map((aircraft) => (
              <option key={aircraft}>{aircraft}</option>
            ))}
          </select>
        </label>
        <label className="form-field">
          <span>Source</span>
          <input
            type="text"
            value={form.source}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, source: e.target.value }))
            }
            placeholder="ICAO"
            maxLength={4}
            required
          />
        </label>
        <label className="form-field">
          <span>Destination</span>
          <input
            type="text"
            value={form.destination}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, destination: e.target.value }))
            }
            placeholder="ICAO"
            maxLength={4}
            required
          />
        </label>
        <div className="form-actions">
          <button type="submit" disabled={isPending}>
            {isPending ? "Saving…" : "Save flight plan"}
          </button>
          <button
            type="button"
            className="ghost"
            onClick={() => setForm(initialState)}
            disabled={isPending}
          >
            Clear
          </button>
        </div>
      </form>
      <div className="divider" />
      <p className="muted">
        {route.length
          ? `Route prefilled from latest planner run (${route.join(" → ")}).`
          : "Run the route planner to auto-populate the route list."}
      </p>
      {isSuccess ? (
        <p className="success">Flight plan saved via API and cached locally.</p>
      ) : null}
    </section>
  );
};

