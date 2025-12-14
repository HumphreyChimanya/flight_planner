import { FormEvent, useState } from "react";
import { useCalculateETA } from "../hooks/useFlightPlanner";

const initialState = {
  distance: 0,
  aircraft: "A320",
  wind: 0
};

export const ETAEstimator = () => {
  const [form, setForm] = useState(initialState);
  const { mutate, data, isPending, isError, error } = useCalculateETA();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({
      distance: form.distance,
      aircraft: form.aircraft,
      wind: form.wind
    });
  };

  return (
    <section className="card">
      <header className="card__header">
        <div>
          <h2>ETA estimator</h2>
          <p>Explains wind adjustments and aircraft-specific cruise speeds.</p>
        </div>
        <div className="badge">/eta/aircraft</div>
      </header>
      <form className="form-grid" onSubmit={handleSubmit}>
        <label className="form-field">
          <span>Distance (km)</span>
          <input
            type="number"
            min={0}
            value={form.distance}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, distance: Number(e.target.value) }))
            }
            required
          />
        </label>
        <label className="form-field">
          <span>Aircraft type</span>
          <input
            type="text"
            value={form.aircraft}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, aircraft: e.target.value }))
            }
            placeholder="e.g. B737"
            required
          />
        </label>
        <label className="form-field">
          <span>Wind (km/h)</span>
          <input
            type="number"
            value={form.wind}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, wind: Number(e.target.value) }))
            }
          />
        </label>
        <div className="form-actions">
          <button type="submit" disabled={isPending}>
            {isPending ? "Estimating…" : "Estimate ETA"}
          </button>
        </div>
      </form>
      <div className="divider" />
      {isError ? (
        <p className="error">
          {(error as Error)?.message ??
            "Unable to compute ETA, check your parameters."}
        </p>
      ) : null}
      {data ? (
        <div className="result">
          <div>
            <p className="result__label">ETA</p>
            <p className="result__value">{data.eta_hours} hours</p>
          </div>
          <div>
            <p className="result__label">Wind adjustment</p>
            <p className="result__value">{data.wind_adjustment_kmh} km/h</p>
          </div>
        </div>
      ) : (
        <p className="muted">
          Provide distance, aircraft, and wind to compute a quick ETA.
        </p>
      )}
    </section>
  );
};



