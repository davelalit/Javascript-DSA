// Dijkstra's algorithm
// Time complexity: O(E log V) where E is the number of edges and V is the number of vertices in the graph.
// Space complexity: O(V) for the priority queue and the distance map.
let dijkstra = (graph, start) => {
    let pq = new MinPriorityQueue({ priority: x => x[1] });
    let distances = {};
    for (const vertex in graph) {
        distances[vertex] = Infinity;
    }
    distances[start] = 0;
    pq.enqueue([start, 0]);
    while (!pq.isEmpty()) {
        let [currentVertex, currentDistance] = pq.dequeue().element;
        if (currentDistance > distances[currentVertex]) continue;
        for (const [neighbor, weight] of graph[currentVertex]) {
            let distance = currentDistance + weight;    
            if (distance < distances[neighbor]) {
                distances[neighbor] = distance;
                pq.enqueue([neighbor, distance]);
            }
        }   
    }
    return distances;
}
