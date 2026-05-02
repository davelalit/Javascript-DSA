// Unique Paths
var uniquePaths = function(m, n) {
    const dp = Array(m).fill().map(() => Array(n).fill(1));
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i-1][j] + dp[i][j-1];
        }
    }
    return dp[m-1][n-1];
};

// Console.log(uniquePaths(3, 7)); // 28

// Longest Common Subsequence
var longestCommonSubsequence = function(text1, text2) {
    const m = text1.length, n = text2.length;
    const dp = Array(m+1).fill().map(() => Array(n+1).fill(0));
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i-1] === text2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    return dp[m][n];
};

// Console.log(longestCommonSubsequence("abcde", "ace")); // 3

// Best Time to Buy and Sell Stock With Cooldown
var maxProfit = function(prices) {
    let n = prices.length;
    let hold = -prices[0], sold = 0, rest = 0;
    for (let i = 1; i < n; i++) {
        let prevHold = hold, prevSold = sold, prevRest = rest;
        hold = Math.max(prevHold, prevRest - prices[i]);
        sold = prevHold + prices[i];
        rest = Math.max(prevRest, prevSold);
    }
    return Math.max(sold, rest);
};
// console.log(maxProfit([1,2,3,0,2])); // 3

// Coin Change II
var change = function(amount, coins) {
    const dp = Array(amount+1).fill(0);
    dp[0] = 1;
    for (let coin of coins) {
        for (let i = coin; i <= amount; i++) {
            dp[i] += dp[i-coin];
        }
    }
    return dp[amount];
};
// const amount = 5, coins = [1,2,5];
// console.log(change(amount, coins)); // 4



// Target Sum
var findTargetSumWays = function(nums, target) {
    const sum = nums.reduce((a,b) => a+b, 0);
    if ((sum + target) % 2 !== 0 || sum < Math.abs(target)) return 0;
    const newTarget = (sum + target) / 2;
    const dp = Array(newTarget+1).fill(0);
    dp[0] = 1;
    for (let num of nums) {
        for (let i = newTarget; i >= num; i--) {
            dp[i] += dp[i-num];
        }
    }
    return dp[newTarget];
};
// const nums = [1,1,1,1,1], target = 3;
// console.log(findTargetSumWays(nums, target)); // 5


// Interleaving String
var isInterleave = function(s1, s2, s3) {
    if (s1.length + s2.length !== s3.length) return false;
    const dp = Array(s1.length+1).fill().map(() => Array(s2.length+1).fill(false));
    dp[0][0] = true;
    for (let i = 0; i <= s1.length; i++) {
        for (let j = 0; j <= s2.length; j++) {
            if (i > 0) dp[i][j] = dp[i][j] || (dp[i-1][j] && s1[i-1] === s3[i+j-1]);
            if (j > 0) dp[i][j] = dp[i][j] || (dp[i][j-1] && s2[j-1] === s3[i+j-1]);
        }
    }
    return dp[s1.length][s2.length];
};
// const s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac";
// console.log(isInterleave(s1, s2, s3)); // true


// Longest Increasing Path in a Matrix
var longestIncreasingPath = function(matrix) {
    const m = matrix.length, n = matrix[0].length;
    const memo = Array(m).fill().map(() => Array(n).fill(0));
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];

    function dfs(x, y) {
        if (memo[x][y]) return memo[x][y];
        let maxLen = 1;
        for (let [dx,dy] of dirs) {
            let nx = x+dx, ny = y+dy;
            if (nx>=0 && ny>=0 && nx<m && ny<n && matrix[nx][ny] > matrix[x][y]) {
                maxLen = Math.max(maxLen, 1 + dfs(nx, ny));
            }
        }
        memo[x][y] = maxLen;
        return maxLen;
    }

    let res = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            res = Math.max(res, dfs(i, j));
        }
    }
    return res;
};
// const matrix = [[9,9,4],[6,6,8],[2,1,1]];
// console.log(longestIncreasingPath(matrix)); // 4


// Distinct Subsequences
var numDistinct = function(s, t) {
    const m = s.length, n = t.length;
    const dp = Array(m+1).fill().map(() => Array(n+1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = 1;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s[i-1] === t[j-1]) {
                dp[i][j] = dp[i-1][j-1] + dp[i-1][j];
            } else {
                dp[i][j] = dp[i-1][j];
            }
        }
    }
    return dp[m][n];
};
// const s = "rabbbit", t = "rabbit";
// console.log(numDistinct(s, t)); // 3


// Edit Distance
var minDistance = function(word1, word2) {
    const m = word1.length, n = word2.length;
    const dp = Array(m+1).fill().map(() => Array(n+1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i-1] === word2[j-1]) {
                dp[i][j] = dp[i-1][j-1];
            } else {
                dp[i][j] = 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
            }
        }
    }
    return dp[m][n];
};
// const word1 = "horse", word2 = "ros";
// console.log(minDistance(word1, word2)); // 3


// Burst Balloons
var maxCoins = function(nums) {
    nums = [1, ...nums, 1];
    const n = nums.length;
    const dp = Array(n).fill().map(() => Array(n).fill(0));
    for (let len = 2; len < n; len++) {
        for (let left = 0; left < n-len; left++) {
            let right = left + len;
            for (let k = left+1; k < right; k++) {
                dp[left][right] = Math.max(dp[left][right],
                    nums[left]*nums[k]*nums[right] + dp[left][k] + dp[k][right]);
            }
        }
    }
    return dp[0][n-1];
};
// const nums = [3,1,5,8];
// console.log(maxCoins(nums)); // 167


// Regular Expression Matching
var isMatch = function(s, p) {
    const m = s.length, n = p.length;
    const dp = Array(m+1).fill().map(() => Array(n+1).fill(false));
    dp[0][0] = true;
    for (let j = 1; j <= n; j++) {
        if (p[j-1] === '*') dp[0][j] = dp[0][j-2];
    }
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (p[j-1] === '.' || p[j-1] === s[i-1]) {
                dp[i][j] = dp[i-1][j-1];
            } else if (p[j-1] === '*') {
                dp[i][j] = dp[i][j-2] || ((p[j-2] === '.' || p[j-2] === s[i-1]) && dp[i-1][j]);
            }
        }
    }
    return dp[m][n];
};
// const s = "aab", p = "c*a*b";
// console.log(isMatch(s, p)); // true
