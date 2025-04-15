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
├── frontend/                 # (Optional - frontend in React or other)
└── README.md

💡 Tech Stack

    FastAPI — lightweight, fast Python web framework

    Pydantic — data validation

    NetworkX — pathfinding and airspace modeling

    (Optional) React for frontend UI

📌 Use Cases

    Demonstrate backend engineering & routing logic

    Build on it for a full-stack Air Traffic Control or aviation logistics system

    Great for portfolio and interviews 👨‍💻
