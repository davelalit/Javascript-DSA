// Network Delay Time (Dijkstra’s Algorithm)
var networkDelayTime = function(times, n, k) {
    const graph = Array.from({length: n+1}, () => []);
    for (let [u, v, w] of times) {
        graph[u].push([v, w]);
    }

    const dist = Array(n+1).fill(Infinity);
    dist[k] = 0;

    const pq = [[0, k]]; // [time, node]
    while (pq.length) {
        pq.sort((a,b) => a[0]-b[0]);
        const [time, node] = pq.shift();
        if (time > dist[node]) continue;
        for (let [nei, w] of graph[node]) {
            if (dist[nei] > time + w) {
                dist[nei] = time + w;
                pq.push([dist[nei], nei]);
            }
        }
    }

    const ans = Math.max(...dist.slice(1));
    return ans === Infinity ? -1 : ans;
};

// const times = [[2,1,1],[2,3,1],[3,4,1]];
// const n = 4, k = 2;
// console.log(networkDelayTime(times, n, k)); // 2


// Reconstruct Itinerary (Hierholzer’s Algorithm for Eulerian Path)
var findItinerary = function(tickets) {
    const graph = {};
    for (let [from, to] of tickets) {
        if (!graph[from]) graph[from] = [];
        graph[from].push(to);
    }
    for (let key in graph) {
        graph[key].sort();
    }

    const res = [];
    function dfs(node) {
        const dests = graph[node] || [];
        while (dests.length) {
            dfs(dests.shift());
        }
        res.unshift(node);
    }
    dfs("JFK");
    return res;
};

// const tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]];
// console.log(findItinerary(tickets)); // ["JFK","MUC","LHR","SFO","SJC"]


// Min Cost to Connect All Points (Prim’s MST)
var minCostConnectPoints = function(points) {
    const n = points.length;
    const visited = Array(n).fill(false);
    const dist = Array(n).fill(Infinity);
    dist[0] = 0;
    let res = 0;

    for (let i = 0; i < n; i++) {
        let u = -1;
        for (let j = 0; j < n; j++) {
            if (!visited[j] && (u === -1 || dist[j] < dist[u])) {
                u = j;
            }
        }
        visited[u] = true;
        res += dist[u];
        for (let v = 0; v < n; v++) {
            if (!visited[v]) {
                const d = Math.abs(points[u][0]-points[v][0]) + Math.abs(points[u][1]-points[v][1]);
                dist[v] = Math.min(dist[v], d);
            }
        }
    }
    return res;
};

// const points = [[0,0],[2,2],[3,10],[5,2],[7,0]];
// console.log(minCostConnectPoints(points)); // 20


//  Swim in Rising Water (Dijkstra on Grid)
var swimInWater = function(grid) {
    const n = grid.length;
    const visited = Array.from({length: n}, () => Array(n).fill(false));
    const pq = [[grid[0][0], 0, 0]]; // [time, x, y]
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];

    while (pq.length) {
        pq.sort((a,b) => a[0]-b[0]);
        const [t, x, y] = pq.shift();
        if (x === n-1 && y === n-1) return t;
        if (visited[x][y]) continue;
        visited[x][y] = true;
        for (let [dx,dy] of dirs) {
            const nx = x+dx, ny = y+dy;
            if (nx>=0 && ny>=0 && nx<n && ny<n && !visited[nx][ny]) {
                pq.push([Math.max(t, grid[nx][ny]), nx, ny]);
            }
        }
    }
};

// const grid = [[0,2],[1,3]];
// console.log(swimInWater(grid)); // 3



// Alien Dictionary (Topological Sort)
var alienOrder = function(words) {
    const graph = {};
    const indegree = {};
    for (let word of words) {
        for (let ch of word) {
            graph[ch] = [];
            indegree[ch] = 0;
        }
    }

    for (let i = 0; i < words.length-1; i++) {
        let w1 = words[i], w2 = words[i+1];
        if (w1.startsWith(w2) && w1.length > w2.length) return "";
        for (let j = 0; j < Math.min(w1.length, w2.length); j++) {
            if (w1[j] !== w2[j]) {
                graph[w1[j]].push(w2[j]);
                indegree[w2[j]]++;
                break;
            }
        }
    }

    const queue = [];
    for (let ch in indegree) {
        if (indegree[ch] === 0) queue.push(ch);
    }

    const res = [];
    while (queue.length) {
        const ch = queue.shift();
        res.push(ch);
        for (let nei of graph[ch]) {
            indegree[nei]--;
            if (indegree[nei] === 0) queue.push(nei);
        }
    }

    return res.length === Object.keys(indegree).length ? res.join("") : "";
};

// const words = ["wrt","wrf","er","ett","rftt"];
// console.log(alienOrder(words)); // "wertf"


// Cheapest Flights Within K Stops (Bellman-Ford)
var findCheapestPrice = function(n, flights, src, dst, K) {
    const dist = Array(n).fill(Infinity);
    dist[src] = 0;

    for (let i = 0; i <= K; i++) {
        const tmp = dist.slice();
        for (let [u,v,w] of flights) {
            if (dist[u] !== Infinity && dist[u] + w < tmp[v]) {
                tmp[v] = dist[u] + w;
            }
        }
        dist.splice(0, n, ...tmp);
    }

    return dist[dst] === Infinity ? -1 : dist[dst];
};

// const n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, K = 1;
// console.log(findCheapestPrice(n, flights, src, dst, K)); // 200
