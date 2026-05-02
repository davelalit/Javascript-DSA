// Number of Islands
// DFS flood-fill each island, marking visited cells
function numIslands(grid) {
    let count = 0;
    let rows = grid.length, cols = grid[0].length;

    function dfs(r, c) {
        if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === "0") return;
        grid[r][c] = "0";
        dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1);
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === "1") {
                count++;
                dfs(r, c);
            }
        }
    }
    return count;
}
console.log(numIslands([["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]])); // 1

// Max Area of Island
// DFS counts connected area size, track maximum.
function maxAreaOfIsland(grid) {
    let rows = grid.length, cols = grid[0].length;
    let maxArea = 0;

    function dfs(r, c) {
        if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === 0) return 0;
        grid[r][c] = 0;
        return 1 + dfs(r+1, c) + dfs(r-1, c) + dfs(r, c+1) + dfs(r, c-1);
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 1) {
                maxArea = Math.max(maxArea, dfs(r, c));
            }
        }
    }
    return maxArea;
}
console.log(maxAreaOfIsland([[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,1,1,1,1], [  ])[[]]])); // 6

// Clone Graph
// DFS with hashmap to avoid cycles. Copy nodes and neighbors recursively.
function cloneGraph(node) {
    if (!node) return null;
    let map = new Map();

    function dfs(curr) {
        if (map.has(curr)) return map.get(curr);
        let copy = new Node(curr.val);
        map.set(curr, copy);
        for (let nei of curr.neighbors) {
            copy.neighbors.push(dfs(nei));
        }
        return copy;
    }

    return dfs(node);
}
console.log(cloneGraph({ val: 1, neighbors: [{ val: 2, neighbors: [{ val: 1 }] }] }})); // { val: 1, neighbors: [{ val: 2, neighbors: [{ val: 1 }] }] }

// Walls and Gates
// Multi-source BFS from all gates simultaneously.
function wallsAndGates(rooms) {
    let rows = rooms.length, cols = rooms[0].length;
    let queue = [];

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (rooms[r][c] === 0) queue.push([r, c]);
        }
    }

    let dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    while (queue.length) {
        let [r, c] = queue.shift();
        for (let [dr, dc] of dirs) {
            let nr = r+dr, nc = c+dc;
            if (nr>=0 && nc>=0 && nr<rows && nc<cols && rooms[nr][nc] === 2147483647) {
                rooms[nr][nc] = rooms[r][c] + 1;
                queue.push([nr, nc]);
            }
        }
    }
}
console.log(wallsAndGates([[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]])); // [[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]

// Rotting Oranges
// BFS level traversal simulates minutes passing.
function orangesRotting(grid) {
    let rows = grid.length, cols = grid[0].length;
    let queue = [], fresh = 0;

    for (let r=0; r<rows; r++) {
        for (let c=0; c<cols; c++) {
            if (grid[r][c] === 2) queue.push([r,c]);
            if (grid[r][c] === 1) fresh++;
        }
    }

    let dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    let minutes = 0;
    while (queue.length && fresh > 0) {
        let size = queue.length;
        for (let i=0; i<size; i++) {
            let [r,c] = queue.shift();
            for (let [dr,dc] of dirs) {
                let nr=r+dr, nc=c+dc;
                if (nr>=0 && nc>=0 && nr<rows && nc<cols && grid[nr][nc]===1) {
                    grid[nr][nc]=2;
                    fresh--;
                    queue.push([nr,nc]);
                }
            }
        }
        minutes++;
    }
    return fresh===0 ? minutes : -1;
}
console.log(orangesRotting([[2,1,1],[1,1,0],[0,1,1]])); // 4
console.log(orangesRotting([[2,1,1],[0,1,1],[1,0,1]])); // -1

// Pacific Atlantic Water Flow
// Reverse DFS from ocean edges. Cells reachable by both oceans are valid.
function pacificAtlantic(heights) {
    let rows = heights.length, cols = heights[0].length;
    let pac = Array.from({length: rows}, () => Array(cols).fill(false));
    let atl = Array.from({length: rows}, () => Array(cols).fill(false));

    function dfs(r,c,visited,prevHeight) {
        if (r<0||c<0||r>=rows||c>=cols||visited[r][c]||heights[r][c]<prevHeight) return;
        visited[r][c]=true;
        dfs(r+1,c,visited,heights[r][c]);
        dfs(r-1,c,visited,heights[r][c]);
        dfs(r,c+1,visited,heights[r][c]);
        dfs(r,c-1,visited,heights[r][c]);
    }

    for (let r=0;r<rows;r++) {
        dfs(r,0,pac,-Infinity);
        dfs(r,cols-1,atl,-Infinity);
    }
    for (let c=0;c<cols;c++) {
        dfs(0,c,pac,-Infinity);
        dfs(rows-1,c,atl,-Infinity);
    }

    let res=[];
    for (let r=0;r<rows;r++) {
        for (let c=0;c<cols;c++) {
            if (pac[r][c] && atl[r][c]) res.push([r,c]);
        }
    }
    return res;
}
console.log(pacificAtlantic([[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]])); // [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]


// Surrounded Regions
// Mark border-connected "O" as safe. Flip the rest.
function solve(board) {
    let rows = board.length, cols = board[0].length;

    function dfs(r,c) {
        if (r<0||c<0||r>=rows||c>=cols||board[r][c]!=="O") return;
        board[r][c] = "#";
        dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1);
    }

    for (let r=0;r<rows;r++) {
        dfs(r,0); dfs(r,cols-1);
    }
    for (let c=0;c<cols;c++) {
        dfs(0,c); dfs(rows-1,c);
    }

    for (let r=0;r<rows;r++) {
        for (let c=0;c<cols;c++) {
            if (board[r][c]==="O") board[r][c]="X";
            if (board[r][c]==="#") board[r][c]="O";
        }
    }
}
console.log(solve([["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]])); // [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]

// Course Schedule
// Topological sort with indegree. If all courses processed, possible.
function canFinish(numCourses, prerequisites) {
    let graph = Array.from({length:numCourses},()=>[]);
    let indegree = Array(numCourses).fill(0);

    for (let [a,b] of prerequisites) {
        graph[b].push(a);
        indegree[a]++;
    }

    let queue=[];
    for (let i=0;i<numCourses;i++) if (indegree[i]===0) queue.push(i);

    let count=0;
    while(queue.length) {
        let node=queue.shift();
        count++;
        for (let nei of graph[node]) {
            indegree[nei]--;
            if (indegree[nei]===0) queue.push(nei);
        }
    }
    return count===numCourses;
}
console.log(canFinish(2, [[1,0]])); // true
console.log(canFinish(2, [[1,0],[0,1]])); // false

// Course Schedule II
// Topological sort using BFS (Kahn’s algorithm). If all courses are processed, return order; otherwise cycle exists.
// Topological sort (Kahn’s algorithm)
function findOrder(numCourses, prerequisites) {
    let graph = Array.from({length:numCourses},()=>[]);
    let indegree = Array(numCourses).fill(0);

    for (let [a,b] of prerequisites) {
        graph[b].push(a);
        indegree[a]++;
    }

    let queue=[], order=[];
    for (let i=0;i<numCourses;i++) if (indegree[i]===0) queue.push(i);

    while(queue.length) {
        let node=queue.shift();
        order.push(node);
        for (let nei of graph[node]) {
            indegree[nei]--;
            if (indegree[nei]===0) queue.push(nei);
        }
    }
    return order.length===numCourses ? order : [];
}
console.log(findOrder(4, [[1,0],[2,0],[3,1],[3,2]])); // [0,1,2,3]
console.log(findOrder(2, [[1,0],[0,1]])); // []

// Graph Valid Tree
// A valid tree must have exactly n-1 edges and be fully connected with no cycles.
// DFS + edge count check
function validTree(n, edges) {
    if (edges.length !== n-1) return false;

    let graph = Array.from({length:n},()=>[]);
    for (let [u,v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }

    let visited = new Set();
    function dfs(node, parent) {
        if (visited.has(node)) return false;
        visited.add(node);
        for (let nei of graph[node]) {
            if (nei===parent) continue;
            if (!dfs(nei,node)) return false;
        }
        return true;
    }

    return dfs(0,-1) && visited.size===n;
}
console.log(validTree(5, [[0,1],[0,2],[0,3],[1,4]])); // true
console.log(validTree(5, [[0,1],[1,2],[2,3],[1,3],[1,4]])); // false


// Number of Connected Components in an Undirected Graph
// DFS each unvisited node, count how many times you start a new DFS → number of components.
// DFS/BFS traversal
function countComponents(n, edges) {
    let graph = Array.from({length:n},()=>[]);
    for (let [u,v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }

    let visited = new Set();
    function dfs(node) {
        if (visited.has(node)) return;
        visited.add(node);
        for (let nei of graph[node]) dfs(nei);
    }

    let count=0;
    for (let i=0;i<n;i++) {
        if (!visited.has(i)) {
            dfs(i);
            count++;
        }
    }
    return count;
}
console.log(countComponents(5, [[0,1],[1,2],[3,4]])); // 2
console.log(countComponents(5, [[0,1],[1,2],[2,3],[3,4]])); // 1

// Redundant Connection
// Union-Find detects cycles. The first edge that connects two already-connected nodes is redundant.
// Union-Find cycle detection
function findRedundantConnection(edges) {
    let parent = Array(edges.length+1).fill(0).map((_,i)=>i);

    function find(x) {
        if (parent[x]!==x) parent[x]=find(parent[x]);
        return parent[x];
    }

    function union(x,y) {
        let rootX=find(x), rootY=find(y);
        if (rootX===rootY) return false;
        parent[rootX]=rootY;
        return true;
    }

    for (let [u,v] of edges) {
        if (!union(u,v)) return [u,v];
    }
}

console.log(findRedundantConnection([[1,2],[1,3],[2,3]])); // [2,3]
console.log(findRedundantConnection([[1,2],[2,3],[3,4],[1,4],[1,5]])); // [1,4]

// Word Ladder
// BFS shortest path. Generate all possible one-letter transformations. Stop when reaching endWord.
// BFS shortest path
function ladderLength(beginWord, endWord, wordList) {
    let wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;

    let queue=[[beginWord,1]];
    while(queue.length) {
        let [word,steps]=queue.shift();
        if (word===endWord) return steps;

        for (let i=0;i<word.length;i++) {
            for (let c=97;c<=122;c++) {
                let newWord=word.slice(0,i)+String.fromCharCode(c)+word.slice(i+1);
                if (wordSet.has(newWord)) {
                    wordSet.delete(newWord);
                    queue.push([newWord,steps+1]);
                }
            }
        }
    }
    return 0;
}
console.log(ladderLength("hit", "cog", ["hot","dot","dog","lot","log","cog"])); // 5
console.log(ladderLength("hit", "cog", ["hot","dot","dog","lot","log"])); // 0