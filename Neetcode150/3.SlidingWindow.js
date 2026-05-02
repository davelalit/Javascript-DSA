// 1. Best Time to Buy and Sell Stock
// Track the minimum price seen so far and compute profit at each step. Update max profit accordingly. Time: O(n), Space: O(1)
var maxProfit = function(prices) {
    let minPrice = Infinity, maxProfit = 0;
    for (let price of prices) {
        minPrice = Math.min(minPrice, price);
        maxProfit = Math.max(maxProfit, price - minPrice);
    }
    return maxProfit;
};
console.log(maxProfit([7,1,5,3,6,4])); // 5

// Longest Substring Without Repeating Characters
// Sliding window with a set. Expand right pointer, shrink left when duplicates appear. Time: O(n).

var lengthOfLongestSubstring = function(s) {
    let set = new Set();
    let left = 0, maxLen = 0;
    for (let right = 0; right < s.length; right++) {
        while (set.has(s[right])) { // if duplicate, remove from set and move left pointer
            set.delete(s[left]);
            left++;
        }
        set.add(s[right]);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
};
console.log(lengthOfLongestSubstring("abcabcbb")); // 3


// Longest Repeating Character Replacement
// Keep track of the most frequent character in the window. If replacements needed exceed k, shrink window. Time: O(n).
var characterReplacement = function(s, k) {
    let count = {};
    let left = 0, maxCount = 0, maxLen = 0;
    for (let right = 0; right < s.length; right++) {
        count[s[right]] = (count[s[right]] || 0) + 1;
        maxCount = Math.max(maxCount, count[s[right]]);
        
        while ((right - left + 1) - maxCount > k) { // if replacements needed exceed k, shrink window
            count[s[left]]--;
            left++;
        }
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
};
console.log(characterReplacement("AABABBA", 1)); // 4

//  Permutation in String
// Use frequency arrays for both strings. Slide window across s2 and compare counts. Time: O(n).
var checkInclusion = function(s1, s2) {
    if (s1.length > s2.length) return false;
    const count1 = new Array(26).fill(0);
    const count2 = new Array(26).fill(0);
    
    for (let i = 0; i < s1.length; i++) {
        count1[s1.charCodeAt(i) - 97]++;
        count2[s2.charCodeAt(i) - 97]++;
    }
    
    let matches = 0;
    for (let i = 0; i < 26; i++) {
        if (count1[i] === count2[i]) matches++;
    }
    
    let left = 0;
    for (let right = s1.length; right < s2.length; right++) {
        if (matches === 26) return true;
        
        let index = s2.charCodeAt(right) - 97;
        count2[index]++;
        if (count2[index] === count1[index]) matches++;
        else if (count2[index] === count1[index] + 1) matches--;
        
        index = s2.charCodeAt(left) - 97;
        count2[index]--;
        if (count2[index] === count1[index]) matches++;
        else if (count2[index] === count1[index] - 1) matches--;
        
        left++;
    }
    return matches === 26;
};
console.log(checkInclusion("ab", "eidbaooo")); // true


//  Minimum Window Substring
// Sliding window with two hash maps. Expand until all required chars are included, then shrink to minimize window. Time: O(n).

var minWindow = function(s, t) {
    if (t.length > s.length) return "";
    const need = {};
    for (let char of t) need[char] = (need[char] || 0) + 1;
    
    let have = 0, required = Object.keys(need).length;
    let window = {}, res = [-1, -1], resLen = Infinity;
    let left = 0;
    
    for (let right = 0; right < s.length; right++) {
        let c = s[right];
        window[c] = (window[c] || 0) + 1;
        
        if (need[c] && window[c] === need[c]) have++;
        
        while (have === required) {
            if ((right - left + 1) < resLen) {
                res = [left, right];
                resLen = right - left + 1;
            }
            window[s[left]]--;
            if (need[s[left]] && window[s[left]] < need[s[left]]) have--;
            left++;
        }
    }
    return resLen === Infinity ? "" : s.slice(res[0], res[1] + 1);
};
console.log(minWindow("ADOBECODEBANC", "ABC")); // "BANC"

// Sliding Window Maximum
// Use a deque to store indices of useful elements in decreasing order. The front always holds the max for the current window. Time: O(n).

var maxSlidingWindow = function(nums, k) {
    const deque = [], res = [];
    for (let i = 0; i < nums.length; i++) {
        while (deque.length && deque[0] <= i - k) deque.shift();
        while (deque.length && nums[deque[deque.length - 1]] < nums[i]) deque.pop();
        deque.push(i);
        if (i >= k - 1) res.push(nums[deque[0]]);
    }
    return res;
};
console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3)); // [3,3,5,5,6,7]