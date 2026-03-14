/**
 * Backtracking is a powerful algorithmic technique for solving problems incrementally, building candidates to the solutions, and abandoning candidates ("backtrack") as soon as it is determined that they cannot lead to a valid solution.
 * It is often used for problems involving permutations, combinations, and subsets.
 * Common applications include:
 * 46. Permutations
 * 47. Permutations II
 * 78. Subsets
 * 51. N-Queens
 * 39. Combination Sum
 * 40. Combination Sum II
 * 77. Combinations
 */

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
 */
var subsets = function(nums) {
    const result = [];
    
    function dfs(start, path) {
        result.push([...path]); // Add the current subset
        
        for (let i = start; i < nums.length; i++) {
            path.push(nums[i]); // Include nums[i]
            dfs(i + 1, path); // Recur with the next index
            path.pop(); // Backtrack
        }
    }
    
    dfs(0, []);
    return result;
}

/** 51. N-Queens
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
    const result = [];
    const board = Array.from({ length: n }, () => Array(n).fill('.'));
    
    function isSafe(row, col) {
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false; // Check column
            if (col - (row - i) >= 0 && board[i][col - (row - i)] === 'Q') return false; // Check left diagonal
            if (col + (row - i) < n && board[i][col + (row - i)] === 'Q') return false; // Check right diagonal
        }
        return true;
    }
    
    function dfs(row) {
        if (row === n) {
            result.push(board.map(r => r.join('')));
            return;
        }
        
        for (let col = 0; col < n; col++) {
            if (isSafe(row, col)) {
                board[row][col] = 'Q'; // Place queen
                dfs(row + 1); // Recur to place next queen
                board[row][col] = '.'; // Backtrack
            }
        }
    }
    
    dfs(0);
    return result;
}

/* 39. Combination Sum
    * @param {number[]} candidates
    * @param {number} target
    * @return {number[][]}
    */
var combinationSum = function(candidates, target) {
    const result = [];
    
    function dfs(start, path, remaining) {
        if (remaining === 0) {
            result.push([...path]);
            return;
        }
        
        for (let i = start; i < candidates.length; i++) {
            if (candidates[i] > remaining) continue; // Skip if the candidate exceeds the remaining target
            
            path.push(candidates[i]); // Include the candidate
            dfs(i, path, remaining - candidates[i]); // Recur with the same index to allow unlimited usage
            path.pop(); // Backtrack
        }
    }
    
    dfs(0, [], target);
    return result;
}

/** 40. Combination Sum II
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
    const result = [];
    candidates.sort((a, b) => a - b); // Sort to handle duplicates
    
    function dfs(start, path, remaining) {
        if (remaining === 0) {
            result.push([...path]);
            return;
        }
        
        for (let i = start; i < candidates.length; i++) {
            if (candidates[i] > remaining) continue; // Skip if the candidate exceeds the remaining target
            if (i > start && candidates[i] === candidates[i - 1]) continue; // Skip duplicates
            
            path.push(candidates[i]); // Include the candidate
            dfs(i + 1, path, remaining - candidates[i]); // Recur with the next index
            path.pop(); // Backtrack
        }
    }
    
    dfs(0, [], target);
    return result;
}

/** 77. Combinations
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
    const result = [];
    
    function dfs(start, path) {
        if (path.length === k) {
            result.push([...path]);
            return;
        }
        
        for (let i = start; i <= n; i++) {
            path.push(i); // Include the current number
            dfs(i + 1, path); // Recur with the next number
            path.pop(); // Backtrack
        }
    }
    
    dfs(1, []);
    return result;
}






