/**
 * Sliding Window Pattern
 * This pattern is used to solve problems that require finding a subarray or substring that meets certain criteria.
 * It involves maintaining a window (a range of elements) that expands or contracts based on the conditions of the problem.
 * Common problems that can be solved using the sliding window technique include:
 * 643. Maximum Average Subarray I
 * 3. Longest Substring without Repeating Characters
 * 76. Minimum Window Substring
 * 209. Minimum Size Subarray Sum
 * 1004. Max Consecutive Ones III
 */

/*
 * 643. Maximum Average Subarray I
 * Given an integer array nums and an integer k, return the maximum average value of a subarray of length k.
 * The answer is guaranteed to be an integer, so you can return it as a rounded integer.
 *      Reference: https://leetcode.com/problems/maximum-average-subarray-i/
 *      Youtube: https://www.youtube.com/watch?v=2b4c6d8a9e4
 * Example 1:
 * Input: nums = [1,12,-5,-6,50,3], k = 4
 * Output: 12   
 * Explanation: Maximum average is (12 + -5 + -6 + 50) / 4 = 12.75, which is rounded down to 12.
 * Example 2:
 * Input: nums = [5], k = 1
 * Output: 5
 */

/*
var findMaxAverage = function(nums, k) {
    var arrLength = nums.length;
    if(arrLength == k){
        var sum = 0;
        nums.forEach((ele) => sum += ele);
        return sum/k;
    }
    var total = 0;
    var average = max_average = 0;
    for(var i=0; i<k; i++) {
        total += nums[i];
    }
    max_average = average = total / k;
   
    for(var i=k-1, j=0; i<arrLength-1; i++) {
        total = total + nums[i+1] - nums[j++] 
        average = total / k;
        if(max_average < average){
            max_average = average;
        }
    }
    return max_average;
};

console.log(findMaxAverage([1,12,-5,-6,50,3], 4)); // 12.75
*/

/* * 3. Longest Substring without Repeating Characters
 * Given a string s, find the length of the longest substring without repeating characters.
 * * Reference: https://leetcode.com/problems/longest-substring-without-repeating-characters/
 * * Youtube: https://www.youtube.com/watch?v=2b4c6d8a9e4
 * Example 1:
 * Input: s = "abcabcbb"
 * Output: 3
 * Explanation: The answer is "abc", with the length of 3.
 * Example 2:
 * Input: s = "bbbbb"
 * Output: 1
 * Explanation: The answer is "b", with the length of 1.
 */
 
 /* var lengthOfLongestSubstring = function(s) {
    let left = 0, right = 0;
    const charSet = new Set();
    let maxLength = 0;
    while (right < s.length) {
        if (!charSet.has(s[right])) {
            charSet.add(s[right]);
            maxLength = Math.max(maxLength, right - left + 1);
            right++;
        } else {
            charSet.delete(s[left]);
            left++;
        }
    }
    return maxLength;
};

console.log(lengthOfLongestSubstring("abcabcbb")); // 3
console.log(lengthOfLongestSubstring("bbbbb")); // 1
*/

/* * 76. Minimum Window Substring
 * Given two strings s and t, return the minimum window in s which will contain all the characters in t.
 * If there is no such window in s that covers all characters in t, return the empty string "".
 * * Reference: https://leetcode.com/problems/minimum-window-substring/
 * * Example 1:
 * Input: s = "ADOBECODEBANC", t = "ABC"
 * Output: "BANC"
 * Explanation: The minimum window substring "BANC" contains all characters of t.
 * * Example 2:
 * Input: s = "a", t = "a"  
 * Output: "a"
 * Explanation: The minimum window substring "a" contains all characters of t.
 */

/*
 var minWindow = function(s, t) {
    if (s.length < t.length) return "";
    const charCount = new Map();
    for (const char of t) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }
    let left = 0, right = 0, required = charCount.size, formed = 0;
    const windowCounts = new Map();
    let minLength = Infinity, minLeft = 0;
    while (right < s.length) {
        const char = s[right];
        windowCounts.set(char, (windowCounts.get(char) || 0) + 1);
        if (charCount.has(char) && windowCounts.get(char) === charCount.get(char)) {
            formed++;
        }
        
        while (left <= right && formed === required) {
            const currentLength = right - left + 1;
            if (currentLength < minLength) {
                minLength = currentLength;
                minLeft = left;
            }
            const leftChar = s[left];
            windowCounts.set(leftChar, windowCounts.get(leftChar) - 1);
            if (charCount.has(leftChar) && windowCounts.get(leftChar) < charCount.get(leftChar)) {
                formed--;
            }
            left++;
        }
        right++;
    }
    return minLength === Infinity ? "" : s.substring(minLeft, minLeft + minLength);
};

// Example usage
console.log(minWindow("ADOBECODEBANC", "ABC")); // "BANC"
console.log(minWindow("a", "a")); // "a"
*/

/* * 209. Minimum Size Subarray Sum
 * Given an array of positive integers nums and a positive integer target, return the minimal length of a contiguous subarray
 * of which the sum is greater than or equal to target. If there is no such subarray, return 0 instead.
 * * Reference: https://leetcode.com/problems/minimum-size-subarray-sum/
 * * Example 1:
 * Input: target = 7, nums = [2,3,1,2,4,3]
 * Output: 2
 * Explanation: The subarray [4,3] has the minimal length under the problem constraint.
 * * Example 2: 
 * Input: target = 4, nums = [1,4,4]
 * Output: 1    
 * Explanation: The subarray [4] has the minimal length under the problem constraint.
 */

/*
var minSubArrayLen = function(target, nums) {
    let left = 0, right = 0, sum = 0;
    let minLength = Infinity;

    while (right < nums.length) {
        sum += nums[right];
        while (sum >= target) {
            minLength = Math.min(minLength, right - left + 1);
            sum -= nums[left];
            left++;
        }
        right++;
    }

    return minLength === Infinity ? 0 : minLength;
};
console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3])); // Output: 2
console.log(minSubArrayLen(4, [1, 4, 4])); // Output: 1
*/

/* * 1004. Max Consecutive Ones III
 * Given a binary array nums and an integer k, return the maximum number of consecutive 1's in the array if you can flip at most k 0's.
 * * Reference: https://leetcode.com/problems/max-consecutive-ones-iii/
 * * Example 1:
 * Input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
 * Output: 6
 * Explanation: [1,1,1,0,0,<1>,1,1,1,1,<1>]
 * Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.
 * * Example 2:
 * Input: nums = [0,0,1,1,0,0], k = 2
 * Output: 4
 * Explanation: The longest subarray with at most 2 flips is [0,0,1,1,0,0] which has length 4.
 * Approach:
 * - Use a sliding window to maintain the count of 0s in the current window.
 * - If the count of 0s exceeds k, move the left pointer to reduce the count.
 * - Keep track of the maximum length of the window. * 
 */

var longestOnes = function(nums, k) {
    let left = 0, right = 0, maxLength = 0, zeroCount = 0;
    while (right < nums.length) {
        if (nums[right] === 0) {
            zeroCount++;
        }
        
        while (zeroCount > k) {
            if (nums[left] === 0) {
                zeroCount--;
            }
            left++;
        }
        
        maxLength = Math.max(maxLength, right - left + 1);
        right++;
    }
    return maxLength;
};

console.log(longestOnes([1,1,1,0,0,0,1,1,1,1,0], 2)); // Output: 6
console.log(longestOnes([1,1,0,0,1,1,1,0,1,1], 2)); // Output: 7
console.log(longestOnes([0,0,1,1,0,0], 2)); // Output: 4