// Given a graph, return shortest path from u to v, where there are obstacles
// represented as blocked nodes in the graph.

function shortestPathWithObstacles(graph, start, end, blockedNodes) {
    const queue = [];
    const visited = new Set();
    const parentMap = new Map();
    const blockedSet = new Set(blockedNodes);

    queue.push(start);
    visited.add(start); 
    parentMap.set(start, null);

    while (queue.length > 0) {
        const currentNode = queue.shift();
        if (currentNode === end) {
            const path = [];
            let node = end;
            while (node !== null) {
                path.push(node);
                node = parentMap.get(node);
            }
            return path.reverse();
        }

        for (const neighbor of graph[currentNode]) {
            if (!visited.has(neighbor) && !blockedSet.has(neighbor)) {
                visited.add(neighbor);
                parentMap.set(neighbor, currentNode);
                queue.push(neighbor);
            }
        }
    }

    return null; // No path found
}

// Explaination:
// 1. We use a breadth-first search (BFS) approach to explore the graph.
// 2. A queue is used to keep track of nodes to explore, and a set is used to track visited nodes.
// 3. We also maintain a parent map to reconstruct the path once we reach the end node.
// 4. If we reach the end node, we backtrack using the parent map to build the path.
// 5. If no path is found, we return null.

// Example usage:
const graph = {
    A: ['B', 'C'],  
    B: ['A', 'D', 'E'],
    C: ['A', 'F'],
    D: ['B'],
    E: ['B', 'F'],
    F: ['C', 'E']
};
const start = 'A';
const end = 'F';
const blockedNodes = ['E'];
const path = shortestPathWithObstacles(graph, start, end, blockedNodes);
console.log(path); // Output: [ 'A', 'C', 'F' ]
