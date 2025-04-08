import json
import networkx as nx

def load_airspace_graph(filepath: str):
    with open(filepath) as f:
        data = json.load(f)
    G = nx.DiGraph()
    for node, edges in data.items():
        for dest, weight in edges.items():
            G.add_edge(node, dest, weight=weight)
    return G

def find_shortest_path(graph, origin: str, destination: str):
    try:
        path = nx.dijkstra_path(graph, origin, destination, weight='weight')
        distance = nx.dijkstra_path_length(graph, origin, destination, weight='weight')
        return {"path": path, "total_distance": distance}
    except nx.NetworkXNoPath:
        return {"error": "No path available."}
    except nx.NodeNotFound as e:
        return {"error": str(e)}
