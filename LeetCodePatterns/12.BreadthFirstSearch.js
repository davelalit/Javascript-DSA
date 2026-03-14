/**
 * Breadth First Search (BFS) is a fundamental algorithm for traversing or searching tree or graph data structures.
 * It explores all the neighbor nodes at the present depth prior to moving on to nodes at the next depth level.
 * BFS can be implemented using a queue.
 * Common applications include:
 * 102. Binary Tree Level Order Traversal
 * 994. Rotting Oranges
 * 127. Word Ladder
 * 200. Number of Islands
 * 542. 01 Matrix
 * 207. Course Schedule
 * 210. Course Schedule II
 */
/** 102. Binary Tree Level Order Traversal
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 * this.val = (val===undefined ? 0 : val);
 * this.left = (left===undefined ? null : left);
 * this.right = (right===undefined ? null : right);
 * }
 * @param {TreeNode} root
 * @return {number[][]}
 * */
var levelOrder = function(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        result.push(currentLevel);
    }
    
    return result;
}
/** 994. Rotting Oranges
 * @param {number[][]} grid
 * @return {number}
 * */   
var orangesRotting = function(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const queue = [];
    let freshCount = 0;
    let minutes = 0;

    // Initialize the queue with rotten oranges and count fresh oranges
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 2) {
                queue.push([r, c]);
            } else if (grid[r][c] === 1) {
                freshCount++;
            }
        }
    }

    // Directions for adjacent cells
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    while (queue.length > 0 && freshCount > 0) {
        const levelSize = queue.length;
        for (let i = 0; i < levelSize; i++) {
            const [r, c] = queue.shift();
            for (const [dr, dc] of directions) {
                const newRow = r + dr;
                const newCol = c + dc;
                if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && grid[newRow][newCol] === 1) {
                    grid[newRow][newCol] = 2; // Mark as rotten
                    freshCount--;
                    queue.push([newRow, newCol]);
                }
            }
        }
        minutes++;
    }

    return freshCount === 0 ? minutes : -1;
}
/** 127. Word Ladder
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 * */
var ladderLength = function(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;

    const queue = [[beginWord, 1]]; // [word, length]
    
    while (queue.length > 0) {
        const [currentWord, length] = queue.shift();
        
        if (currentWord === endWord) return length;
        
        for (let i = 0; i < currentWord.length; i++) {
            for (let charCode = 97; charCode <= 122; charCode++) { // 'a' to 'z'
                const newChar = String.fromCharCode(charCode);
                const newWord = currentWord.slice(0, i) + newChar + currentWord.slice(i + 1);
                
                if (wordSet.has(newWord)) {
                    queue.push([newWord, length + 1]);
                    wordSet.delete(newWord); // Avoid cycles
                }
            }
        }
    }
    
    return 0;
}
/** 207. Course Schedule
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 * */
var canFinish = function(numCourses, prerequisites) {
    const graph = Array.from({ length: numCourses }, () => []);
    const inDegree = Array(numCourses).fill(0);
    
    for (const [course, prereq] of prerequisites) {
        graph[prereq].push(course);
        inDegree[course]++;
    }
    
    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }
    
    let count = 0;
    
    while (queue.length > 0) {
        const course = queue.shift();
        count++;
        
        for (const nextCourse of graph[course]) {
            inDegree[nextCourse]--;
            if (inDegree[nextCourse] === 0) {
                queue.push(nextCourse);
            }
        }
    }
    
    return count === numCourses;
}
/** 210. Course Schedule II
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 * */
var findOrder = function(numCourses, prerequisites) {
    const graph = Array.from({ length: numCourses }, () => []);
    const inDegree = Array(numCourses).fill(0);
    
    for (const [course, prereq] of prerequisites) {
        graph[prereq].push(course);
        inDegree[course]++;
    }
    
    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }
    
    const order = [];
    
    while (queue.length > 0) {
        const course = queue.shift();
        order.push(course);
        
        for (const nextCourse of graph[course]) {
            inDegree[nextCourse]--;
            if (inDegree[nextCourse] === 0) {
                queue.push(nextCourse);
            }
        }
    }
    
    return order.length === numCourses ? order : [];
}
/** 542. 01 Matrix
 * @param {number[][]} mat
 * @return {number[][]} 
 * */
var updateMatrix = function(mat) {
    const rows = mat.length;
    const cols = mat[0].length;
    const queue = [];
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const result = Array.from({ length: rows }, () => Array(cols).fill(Infinity));

    // Initialize the queue with all 0s and set their distances to 0
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (mat[r][c] === 0) {
                queue.push([r, c]);
                result[r][c] = 0;
            }
        }
    }

    while (queue.length > 0) {
        const [r, c] = queue.shift();
        
        for (const [dr, dc] of directions) {
            const newRow = r + dr;
            const newCol = c + dc;
            
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                if (result[newRow][newCol] > result[r][c] + 1) {
                    result[newRow][newCol] = result[r][c] + 1;
                    queue.push([newRow, newCol]);
                }
            }
        }
    }

    return result;
}
/** 200. Number of Islands
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    if (!grid || grid.length === 0) return 0;
    
    const rows = grid.length;
    const cols = grid[0].length;
    let islandCount = 0;
    
    function bfs(r, c) {
        const queue = [[r, c]];
        grid[r][c] = '0'; // Mark as visited
        
        while (queue.length > 0) {
            const [currentRow, currentCol] = queue.shift();
            
            for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
                const newRow = currentRow + dr;
                const newCol = currentCol + dc;
                
                if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && grid[newRow][newCol] === '1') {
                    grid[newRow][newCol] = '0'; // Mark as visited
                    queue.push([newRow, newCol]);
                }
            }
        }
    }
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === '1') {
                islandCount++;
                bfs(i, j);
            }
        }
    }
    
    return islandCount;
}
