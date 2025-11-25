✈️ Flight Planner & Routing System

A simplified Air Traffic Control-inspired system for planning flight routes, estimating ETAs, and saving flight plans — built with FastAPI for the backend and (optionally) a modern frontend stack.
🚀 Features

    Plan and visualize flight routes between airports

    Calculate shortest path using a graph-based airspace model

    Estimate ETA based on aircraft type and wind conditions

    Save and retrieve structured flight plans

    Built with Python (FastAPI) — ideal for backend portfolio demos

📁 Project Structure

flight-planner/
├── backend/
│   ├── app/
│   │   ├── main.py           # FastAPI app
│   │   ├── pathfinder.py     # Route calculation logic
│   │   ├── flight_plans.py   # Flight plan model & logic
│   │   └── data/
│   │       └── airspace_graph.json
├── frontend/                 # React + Vite UI (optional but now scaffolded)
└── README.md

💡 Tech Stack

    FastAPI — lightweight, fast Python web framework

    Pydantic — data validation

    NetworkX — pathfinding and airspace modeling

    React + Vite + TypeScript for the frontend UI

📌 Use Cases

    Demonstrate backend engineering & routing logic

    Build on it for a full-stack Air Traffic Control or aviation logistics system

    Great for portfolio and interviews 👨‍💻

## Frontend UI

The `frontend/` directory contains a Vite-powered React app that talks to the FastAPI backend via a lightweight API client (`axios` + React Query). It includes feature-focused panels for:

- Route planning (`/plan-route`)
- ETA estimation (`/eta/aircraft`)
- Flight-plan persistence preview (`/flight_plans`)

### Local development

1. Install Node.js 18+ (or use `nvm use 20`).
2. From the project root run:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. Ensure the FastAPI server is running on `http://localhost:8000` (the Vite dev server proxies `/api/*` to it).

Build for production with `npm run build`, then serve the static assets from `frontend/dist` behind any static host or via FastAPI's `StaticFiles`.
