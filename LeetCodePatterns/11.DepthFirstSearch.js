/**
 * Depth First Search(DFS) is a fundamental algorithm for traversing or searching tree or graph data structures.
 * It starts at the root (or an arbitrary node in a graph) and explores as far as possible along each branch before backtracking.
 * DFS can be implemented using recursion or a stack.
 * Common applications include: * 
 * 133. Clone Graph
 * 113. Path Sum II
 * 210. Course Schedule II
 */
/** 133. Clone Graph
 * Definition for a Node.
 * function Node(val, neighbors) {  
 *  this.val = val;
 * this.neighbors = neighbors || [];
 * }
 * * @param {Node} node
 * @return {Node}
 * */
var cloneGraph = function(node) {
    if (!node) return null;
    
    const visited = new Map();
    
    function dfs(current) {
        if (visited.has(current.val)) {
            return visited.get(current.val);
        }
        
        const newNode = new Node(current.val);
        visited.set(current.val, newNode);
        
        for (const neighbor of current.neighbors) {
            newNode.neighbors.push(dfs(neighbor));
        }
        
        return newNode;
    }
    
    return dfs(node);
}
/** 113. Path Sum II
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 * this.val = (val===undefined ? 0 : val);
 * this.left = (left===undefined ? null : left);
 * this.right = (right===undefined ? null : right);
 * }
 * @param {TreeNode} root
 *  * @param {number} targetSum
 * @return {number[][]}
 * */
var pathSum = function(root, targetSum) {
    const result = [];
    
    function dfs(node, currentPath, currentSum) {
        if (!node) return;
        
        currentPath.push(node.val);
        currentSum += node.val;
        
        if (!node.left && !node.right && currentSum === targetSum) {
            result.push([...currentPath]);
        } else {
            dfs(node.left, currentPath, currentSum);
            dfs(node.right, currentPath, currentSum);
        }
        
        currentPath.pop();
    }
    
    dfs(root, [], 0);
    return result;
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
/** 200. Number of Islands
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    if (!grid || grid.length === 0) return 0;
    
    const rows = grid.length;
    const cols = grid[0].length;
    let islandCount = 0;
    
    function dfs(r, c) {
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') return;
        
        grid[r][c] = '0'; // Mark as visited
        
        dfs(r - 1, c); // Up
        dfs(r + 1, c); // Down
        dfs(r, c - 1); // Left
        dfs(r, c + 1); // Right
    }
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === '1') {
                islandCount++;
                dfs(i, j);
            }
        }
    }
    
    return islandCount;
}
/** 695. Max Area of Island
 * @param {number[][]} grid
 * @return {number}
 * */
var maxAreaOfIsland = function(grid) {
    if (!grid || grid.length === 0) return 0;
    
    const rows = grid.length;
    const cols = grid[0].length;
    let maxArea = 0;
    
    function dfs(r, c) {
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === 0) return 0;
        
        grid[r][c] = 0; // Mark as visited
        let area = 1; // Count this cell
        
        area += dfs(r - 1, c); // Up
        area += dfs(r + 1, c); // Down
        area += dfs(r, c - 1); // Left
        area += dfs(r, c + 1); // Right
        
        return area;
    }
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === 1) {
                const area = dfs(i, j);
                maxArea = Math.max(maxArea, area);
            }
        }
    }
    
    return maxArea;
}
/** 46. Permutations
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    const result = [];
    
    function dfs(path, remaining) {
        if (remaining.length === 0) {
            result.push(path);
            return;
        }
        
        for (let i = 0; i < remaining.length; i++) {
            const newPath = [...path, remaining[i]];
            const newRemaining = remaining.slice(0, i).concat(remaining.slice(i + 1));
            dfs(newPath, newRemaining);
        }
    }
    
    dfs([], nums);
    return result;
}
/** 47. Permutations II
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
    const result = [];
    nums.sort((a, b) => a - b); // Sort to handle duplicates
    
    function dfs(path, remaining) {
        if (remaining.length === 0) {
            result.push(path);
            return;
        }
        
        for (let i = 0; i < remaining.length; i++) {
            if (i > 0 && remaining[i] === remaining[i - 1]) continue; // Skip duplicates
            
            const newPath = [...path, remaining[i]];
            const newRemaining = remaining.slice(0, i).concat(remaining.slice(i + 1));
            dfs(newPath, newRemaining);
        }
    }
    
    dfs([], nums);
    return result;
}
/** 78. Subsets
 * @param {number[]} nums
 * @return {number[][]} 
 * */
var subsets = function(nums) {
    const result = [];
    
    function dfs(start, path) {
        result.push([...path]); // Add the current subset
        
        for (let i = start; i < nums.length; i++) {
            path.push(nums[i]); // Include nums[i]
            dfs(i + 1, path); // Move to the next element
            path.pop(); // Backtrack
        }
    }
    
    dfs(0, []);
    return result;
}
/** 90. Subsets II
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function(nums) {
    const result = [];
    nums.sort((a, b) => a - b); // Sort to handle duplicates
    
    function dfs(start, path) {
        result.push([...path]); // Add the current subset
        
        for (let i = start; i < nums.length; i++) {
            if (i > start && nums[i] === nums[i - 1]) continue; // Skip duplicates
            
            path.push(nums[i]); // Include nums[i]
            dfs(i + 1, path); // Move to the next element
            path.pop(); // Backtrack
        }
    }
    
    dfs(0, []);
    return result;
}
/** 17. Letter Combinations of a Phone Number
 * @param {string} digits
 * @return {string[]}
 *  */
var letterCombinations = function(digits) {
    if (!digits) return [];
    
    const phoneMap = {
        '2': 'abc',
        '3': 'def',
        '4': 'ghi',
        '5': 'jkl',
        '6': 'mno',
        '7': 'pqrs',
        '8': 'tuv',
        '9': 'wxyz'
    };
    
    const result = [];
    
    function dfs(index, path) {
        if (index === digits.length) {
            result.push(path);
            return;
        }
        
        const letters = phoneMap[digits[index]];
        
        for (const letter of letters) {
            dfs(index + 1, path + letter);
        }
    }
    
    dfs(0, '');
    return result;
}
/** 22. Generate Parentheses
 * @param {number} n
 * @return {string[]}
 */ 
var generateParenthesis = function(n) {
    const result = [];
    
    function dfs(current, open, close) {
        if (current.length === n * 2) {
            result.push(current);
            return;
        }
        
        if (open < n) {
            dfs(current + '(', open + 1, close); // Add an open parenthesis
        }
        if (close < open) {
            dfs(current + ')', open, close + 1); // Add a close parenthesis
        }
    }
    
    dfs('', 0, 0);
    return result;
}
