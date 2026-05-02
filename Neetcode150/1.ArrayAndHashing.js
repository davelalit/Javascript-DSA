// https://neetcode.io/practice/practice/neetcode150
// https://leetcode.com/discuss/post/7347258/15-essential-dsa-patterns-for-tech-inter-nxem/
// Contains Duplicate
// Use a Set to track seen numbers. If a number repeats, return true. Time: O(n), Space: O(n).
var containsDuplicate = function(nums) {
    const seen = new Set();
    for (let num of nums) {
        if (seen.has(num)) return true;
        seen.add(num);
    }
    return false;
};

console.log(containsDuplicate([1, 2, 3, 1])); // true

// Valid Anagram
// Count characters in s, subtract using t. If mismatch, return false. Time: O(n).

var isAnagram = function(s, t) {
    if (s.length !== t.length) return false;
    const count = {};
    for (let char of s) count[char] = (count[char] || 0) + 1;
    for (let char of t) {
        if (!count[char]) return false;
        count[char]--;
    }
    return true;
};
console.log(isAnagram("anagram", "nagaram")); // true

// Two Sum
// Store numbers in a map. Check if complement exists. Time: O(n).

var twoSum = function(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        let complement = target - nums[i];
        if (map.has(complement)) return [map.get(complement), i];
        map.set(nums[i], i);
    }
};
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]


// Group Anagrams
// Sort each word to form a key. Group by key. Time: O(n * k log k).
var groupAnagrams = function(strs) {
    const map = new Map();
    for (let str of strs) {
        let key = str.split('').sort().join('');
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(str);
    }
    return Array.from(map.values());
};
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"])); // [["eat","tea","ate"],["tan","nat"],["bat"]]

// Top K Frequent Elements
// Count frequencies, sort, take top k. Time: O(n log n).

var topKFrequent = function(nums, k) {
    const freq = new Map();
    for (let num of nums) freq.set(num, (freq.get(num) || 0) + 1);
    return [...freq.entries()] // convert map to array of [num, frequency]
        .sort((a, b) => b[1] - a[1]) // sort by frequency descending
        .slice(0, k)
        .map(entry => entry[0]);
};
console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2)); // [1, 2]

// Encode and Decode Strings
// Encode with length prefix. Decode by parsing length and substring. Time: O(n).
var encode = function(strs) {
    return strs.map(s => s.length + '#' + s).join('');
};

var decode = function(s) {
    const res = [];
    let i = 0;
    while (i < s.length) {
        let j = i;
        while (s[j] !== '#') j++;
        let length = parseInt(s.slice(i, j));
        res.push(s.slice(j + 1, j + 1 + length));
        i = j + 1 + length;
    }
    return res;
};
console.log(decode(encode(["Hello", "World"]))); // ["Hello", "World"]

// Product of Array Except Self
var productExceptSelf = function(nums) {
    const n = nums.length;
    const res = new Array(n).fill(1);
    let prefix = 1;
    for (let i = 0; i < n; i++) {
        res[i] = prefix;
        prefix *= nums[i];
    }
    let suffix = 1;
    for (let i = n - 1; i >= 0; i--) {
        res[i] *= suffix;
        suffix *= nums[i];
    }
    return res;
};
console.log(productExceptSelf([1, 2, 3, 4])); // [24, 12, 8, 6]

// Valid Sudoku
// Track row, column, and box constraints with a Set.

var isValidSudoku = function(board) {
    const seen = new Set();
    for (let row = 0; row < 9; row++) { // rows
        for (let column = 0; column < 9; column++) { // columns
            let num = board[row][column];
            if (num === '.') continue;
            if (seen.has(num + " in row " + row) ||
                seen.has(num + " in col " + column) ||
                seen.has(num + " in box " + Math.floor(row/3) + "-" + Math.floor(column/3)))
                return false;
            seen.add(num + " in row " + row);
            seen.add(num + " in col " + column);
            seen.add(num + " in box " + Math.floor(row/3) + "-" + Math.floor(column/3));
        }
    }
    return true;
};
console.log(isValidSudoku([
    ["5","3",".",".","7",".",".",".","."],
    ["6",".",".","1","9","5",".",".","."],
    [".","9","8",".",".",".",".","6","."],
    ["8",".",".",".","6",".",".",".","3"],
    ["4",".",".","8",".","3",".",".","1"],
    ["7",".",".",".","2",".",".",".","6"],
    [".","6",".",".",".",".","2","8","."],
    [".",".",".","4","1","9",".",".","5"],
    [".",".",".",".","8",".",".","7","9"]
])); // true    

// Longest Consecutive Sequence
// Use a Set to track numbers. For each number, if it's the start of a sequence, count length. Time: O(n).
var longestConsecutive = function(nums) {
    const set = new Set(nums);
    let longest = 0;
    for (let num of set) {
        if (!set.has(num - 1)) {
            let length = 1;
            while (set.has(num + length)) length++; // count consecutive numbers
            longest = Math.max(longest, length);
        }
    }
    return longest;
};
console.log(longestConsecutive([100, 4, 200, 1, 3, 2])); // 4