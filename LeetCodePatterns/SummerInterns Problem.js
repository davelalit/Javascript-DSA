// Find the Longest Palindromic Substring
// Given a string s, return the longest palindromic substring in s.
// A string is called a palindrome when it reads the same backward as forward.
// You may assume that the maximum length of s is 1000.
// Reference: https://leetcode.com/problems/longest-palindromic-substring/
// Youtube: https://www.youtube.com/watch?v=XYQecbcd6_c
// Approach: Expand Around Center
// - A palindrome mirrors around its center.
// - The center of a palindrome can be a single character (odd length) or between two characters (even length).
// - For each character (and each pair of characters), expand outwards while the characters on both sides are equal.
// - Keep track of the longest palindrome found during these expansions.
// Example:
// Input: s = "babad"
// Output: "bab" or "aba"
// Explanation: "bab" and "aba" are both valid answers.


function longestPalindrome(s) {
    if (!s || s.length < 1) return "";

    let start = 0, end = 0;

    for (let i = 0; i < s.length; i++) {
        const oddLength = expandFromCenter(s, i, i);       // Odd length
        const evenLength = expandFromCenter(s, i, i + 1);   // Even length
        const maxLength = Math.max(oddLength, evenLength);

        if (maxLength > end - start) { //
            // Update the start and end indices of the longest palindrome found
            // Calculate the new start and end based on the current center and length
            // 
            start = i - Math.floor((maxLength - 1) / 2);
            end = i + Math.floor(maxLength / 2);
        }
    }

    return s.substring(start, end + 1);
}

function expandFromCenter(s, left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
        left--;
        right++;
    }
    return right - left - 1; // Length of the palindrome
}


console.log(longestPalindrome("babad")); // Output: "bab" or "aba"
console.log(longestPalindrome("cbbd"));  // Output: "bb"

// More examples for string manupulation with dynamic programming
// 1. Longest Common Subsequence
function longestCommonSubsequence(text1, text2) {
    const m = text1.length;
    const n = text2.length;

    // Create a 2D DP array
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    // Fill the DP table
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
console.log(longestCommonSubsequence("abcde", "ace")); // Output: 3
console.log(longestCommonSubsequence("abc", "abc"));   // Output: 3
console.log(longestCommonSubsequence("abc", "def"));   // Output: 0

// 2. Edit Distance - Levenshtein Distance

function minDistance(word1, word2) {
    const m = word1.length;
    const n = word2.length;

    // Create a 2D DP array
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    // Initialize base cases
    for (let i = 0; i <= m; i++) dp[i][0] = i; // Deletion
    for (let j = 0; j <= n; j++) dp[0][j] = j; // Insertion

    // Fill the DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1]; // No operation needed
            } else {
                dp[i][j] = 1 + Math.min(
                    dp[i - 1][j],     // Delete
                    dp[i][j - 1],     // Insert
                    dp[i - 1][j - 1]  // Replace
                );
            }
        }
    }

    return dp[m][n];
}
console.log(minDistance("horse", "ros"));     // Output: 3
console.log(minDistance("intention", "execution")); // Output: 5


// 3. Word Break Problem
function wordBreak(s, wordDict) {
    const wordSet = new Set(wordDict);
    const dp = Array(s.length + 1).fill(false);
    dp[0] = true; // Empty string is always "breakable"

    for (let i = 1; i <= s.length; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && wordSet.has(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }

    return dp[s.length];
}
console.log(wordBreak("leetcode", ["leet", "code"]));       // true
console.log(wordBreak("applepenapple", ["apple", "pen"]));  // true
console.log(wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"])); // false

//sub array which has unique elements and sum equal to k
// 560. Subarray Sum Equals K
// Given an array of integers nums and an integer k, return the total number of continuous subarrays whose sum equals to k.
// Reference: https://leetcode.com/problems/subarray-sum-equals-k/
// Youtube: https://www.youtube.com/watch?v=5Y01y9n0kXo
// Approach: Prefix Sum with HashMap
// - Use a hashmap to store the frequency of prefix sums.
// - For each prefix sum, check if (prefixSum - k) exists in the map. If it does, it means there is a subarray ending at the current index which sums to k.
// - Increment the count by the frequency of (prefixSum - k).
// Example:
// Input: nums = [1,1,1], k = 2
// Output: 2

// function subArraySum(nums, k) {
//     const map = new Map();
//     map.set(0, 1); // Initialize with sum 0 occurring once
//     let prefixSum = 0;
//     let count = 0;

//     for (let num of nums) {
//         prefixSum += num;

//         if (map.has(prefixSum - k)) {
//             count += map.get(prefixSum - k);
//         }

//         map.set(prefixSum, (map.get(prefixSum) || 0) + 1);
//     }

//     return count;
// }

// Finding unique subarrays with sum equal to k, sub array should have unique elements
// Approach: Sliding Window with HashMap
// - Use two pointers to represent the current window (left and right).
// - Use a hashmap to store the last seen index of each element.
// - Expand the right pointer and update the prefix sum.
// - If a duplicate is found, move the left pointer to the right of the last seen index of the duplicate.
// - Check if the current prefix sum equals k and increment the count if it does.
// Example:
// Input: nums = [1,2,3,4,5], k = 5
// Output: 2 ([2,3], [5])
 
function uniqueSubArraySum(nums, k) {
    const map = new Map();
    let left = 0;
    let prefixSum = 0;
    let count = 0;

    for (let right = 0; right < nums.length; right++) {
        prefixSum += nums[right];

        // If the current element is a duplicate, move the left pointer
        if (map.has(nums[right])) {
            left = Math.max(left, map.get(nums[right]) + 1);
        }

        // Update the last seen index of the current element
        map.set(nums[right], right);

        // Check if the current prefix sum equals k
        if (prefixSum === k) {
            count++;
        }
        
        // Check if there are any subarrays ending at the current index that sum to k
        if (prefixSum - k in map) {
            count++;
        }
    }

    return count;
}
console.log(uniqueSubArraySum([1, 2, 3, 4, 5], 5)); // Output: 2 ([2,3], [5])
console.log(uniqueSubArraySum([1, 2, 3, 4, 5, 1], 6)); // Output: 3 ([1,2,3], [2,4], [6])
console.log(uniqueSubArraySum([1, 2, 3, 4, 5, 6], 10)); // Output: 4 ([1,2,3,4], [2,3,5], [4,6], [10])

// Function to find unique subarrays with a given sum
// Strategy: Sliding Window with Set and two pointers
// - Use a set to track unique elements in the current window.
// - Use two pointers to represent the current window.
// - Expand the right pointer to include new elements and check if the sum matches the target.
// - If a duplicate is found, shrink the window from the left until all elements are unique.
// - If the current sum equals the target, store the subarray in the result.
//  
// This function uses a sliding window approach to find all unique subarrays that sum to a target
function uniqueSubarraysWithSum(nums, target) {
    const result = [];
    const seen = new Set();
    let left = 0, currentSum = 0;

    for (let right = 0; right < nums.length; right++) {
        while (seen.has(nums[right])) { // If the current number is a duplicate, shrink the window from the left
            seen.delete(nums[left]);
            currentSum -= nums[left];
            left++;
        }

        seen.add(nums[right]);
        currentSum += nums[right];

        // Check if current window matches the target
        if (currentSum === target) {
            result.push(nums.slice(left, right + 1));
        }
    }

    return result;
}
const nums = [1, 2, 3, 2, 1, 4];
const target = 6;
console.log(uniqueSubarraysWithSum(nums, target));
// Output: [ [1, 2, 3], [2, 1, 3], [2, 4] ] depending on input

function allUniqueSubarraysWithSum(nums, target) {
    const result = [];

    for (let start = 0; start < nums.length; start++) {
        const seen = new Set();
        let sum = 0;

        for (let end = start; end < nums.length; end++) {
            if (seen.has(nums[end])) break;

            seen.add(nums[end]);
            sum += nums[end];

            if (sum === target) {
                result.push(nums.slice(start, end + 1));
            }
        }
    }

    return result;
}
console.log(allUniqueSubarraysWithSum(nums, target));

// Add two numbers without using arithmetic operators
// Approach: Bit Manipulation
// - Use bitwise operations to add two numbers without using arithmetic operators.
// - Use XOR to calculate the sum without carry, and AND followed by left shift to calculate the carry.
// - Repeat until there are no carries left.    
function addWithoutArithmetic(a, b) {
    while (b !== 0) {
        const carry = a & b; // Calculate carry
        a = a ^ b;           // Sum without carry
        b = carry << 1;      // Shift carry to the left
        console.log(a + " " + b + " " +  carry); // Debugging output
    }
    return a;
}
console.log(addWithoutArithmetic(5, 3)); // Output: 8
console.log(addWithoutArithmetic(-2, 3)); // Output: 1

// find larget number in array without comparison operators
// Approach: Bit Manipulation
function findLargestNumber(nums) {
    let largest = nums[0];
    for (let i = 1; i < nums.length; i++) {
        // Use bitwise operations to find the maximum
        const diff = nums[i] - largest;
        const sign = (diff >> 31) & 1; // Get the sign bit
        largest = largest + (diff & ~sign); // If diff is negative, keep largest, else update it
    }
    return largest;
}
console.log(findLargestNumber([3, 5, 2, 8, 1])); // Output: 8
console.log(findLargestNumber([-1, -5, -3, -2])); // Output: -1

// string swap values to print a given pattern
// Approach: String Manipulation
function swapValues(str) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        if (i % 2 === 0) {
            result += str[i + 1] || ''; // Add next character if exists
        } else {
            result += str[i - 1]; // Add previous character
        }
    }
    return result;
}
console.log(swapValues("abcdef")); // Output: "badcfe"






