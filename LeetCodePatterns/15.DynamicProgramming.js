/**
 * Dynamic Programming is a method for solving complex problems by breaking them down into simpler subproblems.
 * It is applicable when the problem can be divided into overlapping subproblems that can be solved independently.
 * Common applications include: 
 * 70. Climbing Stairs
 * 322. Coin Change
 * 300. Longest Increasing Subsequence
 * 416. Partition Equal Subset Sum
 * 312. Burst Balloons
 * 1143. Longest Common Subsequence
 * 139. Word Break
 * 198. House Robber
 * 198. House Robber II
 * 62. Unique Paths
 * 63. Unique Paths II
 * 64. Minimum Path Sum
 */

/** 70. Climbing Stairs
 * You are climbing a staircase. It takes n steps to reach the top.
 * Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
 * @param {number} n        
 * @return {number}
 * */
var climbStairs = function(n) {
    if (n <= 2) return n;
    
    const dp = new Array(n + 1).fill(0);
    dp[1] = 1;
    dp[2] = 2;
    
    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}
/** 322. Coin Change
 * You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.
 * Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.
 * You may assume that you have an infinite number of each kind of coin.    
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 * */
var coinChange = function(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0; // Base case: 0 coins needed to make amount 0
    
    for (const coin of coins) {
        for (let i = coin; i <= amount; i++) {
            dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
    }
    
    return dp[amount] === Infinity ? -1 : dp[amount];
}

/** 300. Longest Increasing Subsequence
 * Given an integer array nums, return the length of the longest strictly increasing subsequence.
 * @param {number[]} nums
 * @return {number}
 * */
var lengthOfLIS = function(nums) {
    const dp = new Array(nums.length).fill(1);
    
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }
    
    return Math.max(...dp);
}

/** 416. Partition Equal Subset Sum
 * Given a non-empty array nums containing only positive integers, find if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal.
 * @param {number[]} nums
 * @return {boolean}
 * */
var canPartition = function(nums) {
    const total = nums.reduce((a, b) => a + b, 0);
    if (total % 2 !== 0) return false; // If total is odd, cannot partition
    
    const target = total / 2;
    const dp = new Array(target + 1).fill(false);
    dp[0] = true; // Base case: sum of 0 can always be achieved
    
    for (const num of nums) {
        for (let j = target; j >= num; j--) {
            dp[j] = dp[j] || dp[j - num];
        }
    }
    
    return dp[target];
}

/** 312. Burst Balloons
 * Given n balloons, indexed from 0 to n-1. Each balloon is painted with a number on it represented by an array nums.
 * You are asked to burst all the balloons. If you burst balloon i you will get nums[left] * nums[i] * nums[right] coins.
 * Here left and right are adjacent indices of i. After the burst, the left and right then becomes adjacent.
 * Return the maximum coins you can collect by bursting the balloons wisely.
 * @param {number[]} nums
 * @return {number}
 * */
var maxCoins = function(nums) {
    const n = nums.length;
    const dp = Array.from({ length: n + 2 }, () => Array(n + 2).fill(0));
    
    // Add 1s to the boundaries
    const balloons = [1, ...nums, 1];
    
    for (let length = 1; length <= n; length++) {
        for (let left = 1; left <= n - length + 1; left++) {
            const right = left + length - 1;
            for (let i = left; i <= right; i++) {
                dp[left][right] = Math.max(dp[left][right], 
                    dp[left][i - 1] + dp[i + 1][right] + balloons[left - 1] * balloons[i] * balloons[right + 1]);
            }
        }
    }
    
    return dp[1][n];
}

/** 1143. Longest Common Subsequence
 * Given two strings text1 and text2, return the length of their longest common subsequence.
 * A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 * */

var longestCommonSubsequence = function(text1, text2) {
    const m = text1.length;
    const n = text2.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[m][n];
}

/** 139. Word Break
 * Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 * */

var wordBreak = function(s, wordDict) {
    const dp = new Array(s.length + 1).fill(false);
    dp[0] = true; // Base case: empty string can always be segmented
    
    for (let i = 1; i <= s.length; i++) {
        for (const word of wordDict) {
            const len = word.length;
            if (i >= len && dp[i - len] && s.substring(i - len, i) === word) {
                dp[i] = true;
                break; // No need to check further if we found a valid segmentation
            }
        }
    }
    
    return dp[s.length];
}

/** 198. House Robber
 * You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed.
 * All houses at this place are arranged in a circle. That means the first house is the neighbor of the last one.
 * Meanwhile, adjacent houses have security systems connected, and it will automatically contact the police if two adjacent houses were broken into on the same night.
 * Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.
 * @param {number[]} nums
 * @return {number}
 * */
var rob = function(nums) {
    const n = nums.length;
    if (n === 0) return 0;
    if (n === 1) return nums[0];
    
    const dp = new Array(n).fill(0);
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);
    
    for (let i = 2; i < n; i++) {
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
    }
    
    return dp[n - 1];   
}

/** 198. House Robber II
 * This is similar to the previous problem but now the houses are arranged in a circle.
 * @param {number[]} nums
 * @return {number}
 * */
var robII = function(nums) {
    const n = nums.length;
    if (n === 0) return 0;
    if (n === 1) return nums[0];
    
    // Helper function to calculate max rob amount for a linear street
    const robLinear = (nums) => {
        const dp = new Array(nums.length).fill(0);
        dp[0] = nums[0];
        dp[1] = Math.max(nums[0], nums[1]);
        
        for (let i = 2; i < nums.length; i++) {
            dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
        }
        
        return dp[nums.length - 1];
    }
    
    // Rob either from the first house to the second last or from the second house to the last
    return Math.max(robLinear(nums.slice(0, n - 1)), robLinear(nums.slice(1)));
}

/** 62. Unique Paths
 * A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).
 * The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).
 * How many possible unique paths are there?
 * @param {number} m
 * @param {number} n
 * @return {number}
 * */
var uniquePaths = function(m, n) {
    const dp = Array.from({ length: m }, () => new Array(n).fill(1));
    
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }
    
    return dp[m - 1][n - 1];
}

/** 63. Unique Paths II
 * A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).
 * The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).
 * Now consider if some obstacles are added to the grids. How many unique paths would there be?
 * An obstacle and empty space is marked as 1 and 0 respectively in the grid.
 * @param {number[][]} obstacleGrid
 * @return {number}
 * */
var uniquePathsWithObstacles = function(obstacleGrid) {
    const m = obstacleGrid.length;
    const n = obstacleGrid[0].length;
    
    if (obstacleGrid[0][0] === 1 || obstacleGrid[m - 1][n - 1] === 1) return 0; // If start or end is blocked
    
    const dp = Array.from({ length: m }, () => new Array(n).fill(0));
    dp[0][0] = 1; // Start position
    
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (obstacleGrid[i][j] === 1) {
                dp[i][j] = 0; // Blocked cell
            } else {
                if (i > 0) dp[i][j] += dp[i - 1][j]; // From top
                if (j > 0) dp[i][j] += dp[i][j - 1]; // From left
            }
        }
    }
    
    return dp[m - 1][n - 1];
}

/** 64. Minimum Path Sum
 * Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right which minimizes the sum of all numbers along its path.
 * Note: You can only move either down or right at any point in time.
 * @param {number[][]} grid
 * @return {number}
 * */
var minPathSum = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    
    const dp = Array.from({ length: m }, () => new Array(n).fill(0));
    dp[0][0] = grid[0][0]; // Start position
    
    // Fill the first row
    for (let j = 1; j < n; j++) {
        dp[0][j] = dp[0][j - 1] + grid[0][j];
    }
    
    // Fill the first column
    for (let i = 1; i < m; i++) {
        dp[i][0] = dp[i - 1][0] + grid[i][0];
    }
    
    // Fill the rest of the grid
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
        }
    }
    
    return dp[m - 1][n - 1];
}

/** 63. Unique Paths II
 * A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).
 * The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).
 * Now consider if some obstacles are added to the grids. How many unique paths would there be?
 * An obstacle and empty space is marked as 1 and 0 respectively in the grid.
 * @param {number[][]} obstacleGrid
 * @return {number}
 * */
var uniquePathsWithObstacles = function(obstacleGrid) {
    const m = obstacleGrid.length;
    const n = obstacleGrid[0].length;
    
    if (obstacleGrid[0][0] === 1 || obstacleGrid[m - 1][n - 1] === 1) return 0; // If start or end is blocked
    
    const dp = Array.from({ length: m }, () => new Array(n).fill(0));
    dp[0][0] = 1; // Start position
    
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (obstacleGrid[i][j] === 1) {
                dp[i][j] = 0; // Blocked cell
            } else {
                if (i > 0) dp[i][j] += dp[i - 1][j]; // From top
                if (j > 0) dp[i][j] += dp[i][j - 1]; // From left
            }
        }
    }
    
    return dp[m - 1][n - 1];
}

/** 127. Word Ladder
 * Given two words (beginWord and endWord), and a dictionary's word list, return the length of the shortest transformation sequence from beginWord to endWord, such that:
 * Only one letter can be changed at a time.
 * Each transformed word must exist in the word list.
 * Note that beginWord is not a transformed word.
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
 * There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1.
 * You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.
 * Return true if you can finish all courses. Otherwise, return false.
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */

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
 * There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1.
 * You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.
 * Return the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
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

/** 47. Permutations II
 * Given a collection of numbers, nums, that might contain duplicates, return all possible unique permutations in any order.
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


// Find the Longest Palindromic Substring
/** 5. Longest Palindromic Substring
 * Given a string s, return the longest palindromic substring in s.
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    if (s.length < 2) return s;
    
    let start = 0, end = 0;
    
    const expandAroundCenter = (left, right) => {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--;
            right++;
        }
        return right - left - 1; // Length of the palindrome
    }
    
    for (let i = 0; i < s.length; i++) {
        const len1 = expandAroundCenter(i, i); // Odd length palindromes
        const len2 = expandAroundCenter(i, i + 1); // Even length palindromes
        const len = Math.max(len1, len2);
        
        if (len > end - start) {
            start = i - Math.floor((len - 1) / 2);
            end = i + Math.floor(len / 2);
        }
    }
    
    return s.substring(start, end + 1);     
}
 

