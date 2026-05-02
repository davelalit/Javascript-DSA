// Subsets
// DFS/backtracking: at each step, choose to include or exclude the current number. Time: O(2^n).

var subsets = function(nums) {
    const res = [];
    const backtrack = (start, path) => {
        res.push([...path]);
        for (let i = start; i < nums.length; i++) {
            path.push(nums[i]);
            backtrack(i + 1, path);
            path.pop();
        }
    };
    backtrack(0, []);
    return res;
};
console.log(subsets([1, 2, 3])); // [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]

// Combination Sum
// Try each candidate recursively. Allow reuse by passing same index. Time: Exponential.

var combinationSum = function(candidates, target) {
    const res = [];
    const backtrack = (start, path, sum) => {
        if (sum === target) {
            res.push([...path]);
            return;
        }
        if (sum > target) return;
        for (let i = start; i < candidates.length; i++) {
            path.push(candidates[i]);
            backtrack(i, path, sum + candidates[i]); // reuse allowed
            path.pop();
        }
    };
    backtrack(0, [], 0);
    return res;
};
console.log(combinationSum([2, 3, 6, 7], 7)); // [[7], [2, 2, 3]]

// Combination Sum II
// Sort to handle duplicates. Skip identical numbers at same recursion depth. Time: Exponential.
var combinationSum2 = function(candidates, target) {
    candidates.sort((a, b) => a - b);
    const res = [];
    const backtrack = (start, path, sum) => {
        if (sum === target) {
            res.push([...path]);
            return;
        }
        if (sum > target) return;
        for (let i = start; i < candidates.length; i++) {
            if (i > start && candidates[i] === candidates[i - 1]) continue; // skip duplicates
            path.push(candidates[i]);
            backtrack(i + 1, path, sum + candidates[i]); // no reuse
            path.pop();
        }
    };
    backtrack(0, [], 0);
    return res;
};
console.log(combinationSum2([10,1,2,7,6,1,5], 8)); // [[1,1,6], [1,2,5], [1,7], [2,6]]

// Permutations
// DFS: build permutations by choosing unused numbers. Time: O(n!).
var permute = function(nums) {
    const res = [];
    const backtrack = (path) => {
        if (path.length === nums.length) {
            res.push([...path]);
            return;
        }
        for (let num of nums) {
            if (path.includes(num)) continue;
            path.push(num);
            backtrack(path);
            path.pop();
        }
    };
    backtrack([]);
    return res;
};
console.log(permute([1, 2, 3])); // [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]


// Subsets II
// Sort and skip duplicates at same recursion depth. Time: O(2^n).
var subsetsWithDup = function(nums) {
    nums.sort((a, b) => a - b);
    const res = [];
    const backtrack = (start, path) => {
        res.push([...path]);
        for (let i = start; i < nums.length; i++) {
            if (i > start && nums[i] === nums[i - 1]) continue;
            path.push(nums[i]);
            backtrack(i + 1, path);
            path.pop();
        }
    };
    backtrack(0, []);
    return res;
};
console.log(subsetsWithDup([1, 2, 2])); // [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]]


// Generate Parentheses
// Ensure valid parentheses by tracking counts of open and close. Time: Catalan number complexity.
var generateParenthesis = function(n) {
    const res = [];
    const backtrack = (open, close, path) => {
        if (path.length === 2 * n) {
            res.push(path);
            return;
        }
        if (open < n) backtrack(open + 1, close, path + '(');
        if (close < open) backtrack(open, close + 1, path + ')');
    };
    backtrack(0, 0, '');
    return res;
};
console.log(generateParenthesis(3)); // ["((()))","(()())","(())()","()(())","()()()"]


// Word Search
// DFS search from each cell, marking visited temporarily. Time: O(m * n * 4^L).

var exist = function(board, word) {
    const rows = board.length, cols = board[0].length;
    const dfs = (r, c, i) => {
        if (i === word.length) return true;
        if (r < 0 || c < 0 || r >= rows || c >= cols || board[r][c] !== word[i]) return false;
        let temp = board[r][c];
        board[r][c] = '#'; // mark visited
        let found = dfs(r+1,c,i+1) || dfs(r-1,c,i+1) || dfs(r,c+1,i+1) || dfs(r,c-1,i+1);
        board[r][c] = temp;
        return found;
    };
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (dfs(r, c, 0)) return true;
        }
    }
    return false;
};
console.log(exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCCED")); // true


// Palindrome Partitioning
// DFS: partition string, check palindrome substrings, recurse. Time: Exponential.
var partition = function(s) {
    const res = [];
    const isPalindrome = (str, l, r) => {
        while (l < r) {
            if (str[l++] !== str[r--]) return false;
        }
        return true;
    };
    const backtrack = (start, path) => {
        if (start === s.length) {
            res.push([...path]);
            return;
        }
        for (let end = start; end < s.length; end++) {
            if (isPalindrome(s, start, end)) {
                path.push(s.slice(start, end + 1));
                backtrack(end + 1, path);
                path.pop();
            }
        }
    };
    backtrack(0, []);
    return res;
};
console.log(partition("aab")); // [["a","a","b"], ["aa","b"]]


// Letter Combinations of a Phone Number
// DFS: for each digit, try all mapped letters. Time: O(4^n).

var letterCombinations = function(digits) {
    if (!digits.length) return [];
    const map = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    };
    const res = [];
    const backtrack = (i, path) => {
        if (i === digits.length) {
            res.push(path);
            return;
        }
        for (let char of map[digits[i]]) {
            backtrack(i + 1, path + char);
        }
    };
    backtrack(0, '');
    return res;
};
console.log(letterCombinations("23")); // ["ad","ae","af","bd","be","bf","cd","ce","cf"]

// N Queens
// Backtracking: place queens row by row, track attacked columns and diagonals. Time: Exponential.
var solveNQueens = function(n) {
    const res = [];
    const board = Array(n).fill().map(() => Array(n).fill('.'));
    const cols = new Set(), diag1 = new Set(), diag2 = new Set();
    
    const backtrack = (r) => {
        if (r === n) {
            res.push(board.map(row => row.join('')));
            return;
        }
        for (let c = 0; c < n; c++) {
            if (cols.has(c) || diag1.has(r - c) || diag2.has(r + c)) continue;
            board[r][c] = 'Q';
            cols.add(c); diag1.add(r - c); diag2.add(r + c);
            backtrack(r + 1);
            board[r][c] = '.';
            cols.delete(c); diag1.delete(r - c); diag2.delete(r + c);
        }
    };
    backtrack(0);
    return res;
};
console.log(solveNQueens(4)); // [".Q..","...Q","Q...","..Q."] and ["..Q.","Q...","...Q",".Q.."]]


