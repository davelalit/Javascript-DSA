// Climbing Stairs
/**
 * You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

Example:

Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step

 To reach nth step, what could have been your previous steps? (Think about the step sizes)
 */
var climbStairs = function(n) {
    if (n <= 2) return n;
    let a = 1, b = 2;
    for (let i = 3; i <= n; i++) {
        let c = a + b;
        a = b;
        b = c;
    }
    return b;
};

// Console.log(climbStairs(5)); // 8


// Min Cost Climbing Stairs
var minCostClimbingStairs = function(cost) {
    let n = cost.length;
    let dp = Array(n+1).fill(0);
    for (let i = 2; i <= n; i++) {
        dp[i] = Math.min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2]);
    }
    return dp[n];
};

// const cost = [10, 15, 20];
// console.log(minCostClimbingStairs(cost)); // 15


// House Robber
var rob = function(nums) {
    let prev1 = 0, prev2 = 0;
    for (let num of nums) {
        let temp = Math.max(prev1, prev2 + num);
        prev2 = prev1;
        prev1 = temp;
    }
    return prev1;
};

// const nums = [1,2,3,1];
// console.log(rob(nums)); // 4


// House Robber II (Circular)
var rob = function(nums) {
    if (nums.length === 1) return nums[0];
    const robLinear = (arr) => {
        let prev1 = 0, prev2 = 0;
        for (let num of arr) {
            let temp = Math.max(prev1, prev2 + num);
            prev2 = prev1;
            prev1 = temp;
        }
        return prev1;
    };
    return Math.max(robLinear(nums.slice(1)), robLinear(nums.slice(0, -1)));
};
// const nums = [2,3,2];
// console.log(rob(nums)); // 3 


// Longest Palindromic Substring
var longestPalindrome = function(s) {
    let res = "";
    const expand = (l, r) => {
        while (l >= 0 && r < s.length && s[l] === s[r]) {
            if (r - l + 1 > res.length) res = s.slice(l, r+1);
            l--; r++;
        }
    };
    for (let i = 0; i < s.length; i++) {
        expand(i, i);     // odd length
        expand(i, i+1);   // even length
    }
    return res;
};
// console.log(longestPalindrome("babad")); // "aba" or "bab"



// Palindromic Substrings
var countSubstrings = function(s) {
    let count = 0;
    const expand = (l, r) => {
        while (l >= 0 && r < s.length && s[l] === s[r]) {
            count++;
            l--; r++;
        }
    };
    for (let i = 0; i < s.length; i++) {
        expand(i, i);
        expand(i, i+1);
    }
    return count;
};
// console.log(countSubstrings("aaa")); // 6



// Decode Ways
var numDecodings = function(s) {
    if (!s || s[0] === '0') return 0;
    let n = s.length;
    let dp = Array(n+1).fill(0);
    dp[0] = 1; dp[1] = 1;
    for (let i = 2; i <= n; i++) {
        if (s[i-1] !== '0') dp[i] += dp[i-1];
        let two = parseInt(s.slice(i-2, i));
        if (two >= 10 && two <= 26) dp[i] += dp[i-2];
    }
    return dp[n];
};
// console.log(numDecodings("226")); // 3


// Coin Change
var coinChange = function(coins, amount) {
    let dp = Array(amount+1).fill(Infinity);
    dp[0] = 0;
    for (let coin of coins) {
        for (let i = coin; i <= amount; i++) {
            dp[i] = Math.min(dp[i], dp[i-coin] + 1);
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
};
// const coins = [1,2,5], amount = 11;
// console.log(coinChange(coins, amount)); // 3



// Maximum Product Subarray
var maxProduct = function(nums) {
    let maxProd = nums[0], minProd = nums[0], res = nums[0];
    for (let i = 1; i < nums.length; i++) {
        let cur = nums[i];
        if (cur < 0) [maxProd, minProd] = [minProd, maxProd];
        maxProd = Math.max(cur, maxProd * cur);
        minProd = Math.min(cur, minProd * cur);
        res = Math.max(res, maxProd);
    }
    return res;
};
// console.log(maxProduct([2,3,-2,4])); // 6


// Word Break
var wordBreak = function(s, wordDict) {
    const set = new Set(wordDict);
    let dp = Array(s.length+1).fill(false);
    dp[0] = true;
    for (let i = 1; i <= s.length; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && set.has(s.slice(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }
    return dp[s.length];
};
// const s = "leetcode", wordDict = ["leet","code"];
// console.log(wordBreak(s, wordDict)); // true


// Longest Increasing Subsequence
var lengthOfLIS = function(nums) {
    const dp = [];
    for (let num of nums) {
        let l = 0, r = dp.length;
        while (l < r) {
            let m = Math.floor((l+r)/2);
            if (dp[m] < num) l = m+1;
            else r = m;
        }
        dp[l] = num;
    }
    return dp.length;
};
// console.log(lengthOfLIS([10,9,2,5,3,7,101,18])); // 4


// Partition Equal Subset Sum
var canPartition = function(nums) {
    let sum = nums.reduce((a,b) => a+b, 0);
    if (sum % 2 !== 0) return false;
    let target = sum / 2;
    let dp = Array(target+1).fill(false);
    dp[0] = true;
    for (let num of nums) {
        for (let i = target; i >= num; i--) {
            dp[i] = dp[i] || dp[i-num];
        }
    }
    return dp[target];
};
// const nums = [1,5,11,5];
// console.log(canPartition(nums)); // true