import os
import json
import networkx as nx

BASE_DIR = os.path.dirname(__file__)
GRAPH_PATH = os.path.join(BASE_DIR, "data", "airspace_graph.json")

def load_airspace_graph():
    with open(GRAPH_PATH, "r") as f:
        return json.load(f)


def find_shortest_path(graph, origin: str, destination: str):
    try:
        path = nx.dijkstra_path(graph, origin, destination, weight='weight')
        distance = nx.dijkstra_path_length(graph, origin, destination, weight='weight')
        return {"path": path, "total_distance": distance}
    except nx.NetworkXNoPath:
        return {"error": "No path available."}
    except nx.NodeNotFound as e:
        return {"error": str(e)}
