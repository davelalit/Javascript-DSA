/**
 * 
 * @param {*} prices 
 * @returns 
 * 1. Prefix Sum
   2. Two Pointer
    2:05 => Sliding Window
    2:54 => Fast & Slow Pointer
    3:39 => Linked List In-Place Reversal 
    4:36 => Monotonic Stack
    5:26 => Top 'k' Elements - Min Heap/Max Heap
    6:14 => Quick Select -
    6:33 => Overlapping Intervals
    7:25 => Modified Binary Search 
    Binary Tree Traversal
    8:56 => Depth-First Search(DFS) - Stack/Recursion
    9:32 => Breadth-First Search(BFS) - Queue
    10:11 => Matrix Traversal
    11:04 => Backtracking - Recursion
    11:52 => Dynamic Programming - Memoization/Tabulation
    13:06 => Greedy Algorithms
    13:45 => Graphs - Adjacency List/Matrix
 */
// 1. Best Time to Buy and Sell Stock
// Given an array where the ith element is the price of a given stock on day i,
// find the maximum profit you can achieve by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.
// If no profit can be achieved, return 0.
function maxProfit(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;
    for (let price of prices) {
        if (price < minPrice) {
            minPrice = price;
        }
        else if (price - minPrice > maxProfit) {
            maxProfit = price - minPrice;
        }
    }
    return maxProfit;
}   
// Example usage:
const prices = [7, 1, 5, 3, 6, 4];
console.log(maxProfit(prices)); // Output: 5

// 2. 3Sum
// Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
function threeSum(nums) {   
    nums.sort((a, b) => a - b);
    const result = [];
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue; // Skip duplicate values
        let left = i + 1;
        let right = nums.length - 1;
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right]; 
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left + 1]) left++; // Skip duplicate values
                while (left < right && nums[right] === nums[right - 1]) right--; // Skip duplicate values
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return result;
}

//Explanation:
// The function first sorts the input array to facilitate the two-pointer technique.
// It then iterates through the array, fixing one element and using two pointers to find pairs that sum to the negative of the fixed element.
// Duplicate values are skipped to ensure unique triplets in the result.


// Example usage:
const nums = [-1, 0, 1, 2, -1, -4];
console.log(threeSum(nums)); // Output: [[-1, -1, 2], [-1, 0, 1]]

// 3. Find the Child Who Has the Ball After K Seconds
/*  You are given two positive integers n and k. There are n children numbered from 0 to n - 1 standing in a queue in order from left to right.

Initially, child 0 holds a ball and the direction of passing the ball is towards the right direction. After each second, the child holding the ball passes it to the child next to them. Once the ball reaches either end of the line, i.e. child 0 or child n - 1, the direction of passing is reversed.

Return the number of the child who receives the ball after k seconds.
*/

function findChildWithBall(n, k) {
    return (k - 1) % n + 1;
}
// explanation:
// The function calculates the position of the child who has the ball after k seconds using modular arithmetic.
// Since the ball is passed in a circular manner among n children, the position can be determined by taking (k - 1) modulo n and adding 1 to convert from 0-based to 1-based indexing.
// Example usage:
const n = 5;
const k = 8;
console.log(findChildWithBall(n, k)); // Output: 4

// 4. Daily Temperatures
// Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.
function dailyTemperatures(temperatures) {
    const n = temperatures.length;
    const answer = new Array(n).fill(0);
    const stack = []; // Monotonic Decreasing Stack
    for (let i = n - 1; i >= 0; i--) {
        // Pop indices from the stack until we find a warmer temperature or the stack is empty
        while (stack.length > 0 && temperatures[i] >= temperatures[stack[stack.length - 1]]) {
            stack.pop();
        }
        if (stack.length > 0) {
            answer[i] = stack[stack.length - 1] - i;
        }
        stack.push(i);
    }
    return answer;
}
// Explanation:
// The function uses a stack to keep track of the indices of days with temperatures.
// It iterates through the temperatures array in reverse order, ensuring that for each day, it finds the next warmer day efficiently.
// If a warmer day is found, the difference in indices is recorded in the answer array; otherwise, it remains 0.
// Example usage:
const temperatures = [73, 74, 75, 71, 69, 72, 76, 73];
console.log(dailyTemperatures(temperatures)); // Output: [1, 1, 4, 2, 1, 1, 0, 0]

/**
 * A monotonic stack is a special type of stack data structure where elements are kept in either increasing or decreasing order.
 * Types of Monotonic Stack:
 * Monotonic Increasing Stack
Elements inside the stack are always in increasing order.
While inserting a new element, all greater elements are popped.
Example:

For arr[] = [1, 7, 9, 5]:

Push 1 → [1]
Push 7 → [1, 7] (since 7 > 1, order holds)
Push 9 → [1, 7, 9] (since 9 > 7, order holds)
Push 5 → pop 9, pop 7, then push 5 → [1, 5]
 * Monotonic Decreasing Stack
Elements inside the stack are always in decreasing order.
While inserting a new element, all smaller elements are popped.
Example:

For arr[] = [1, 7, 9, 5]:

Push 1 → [1]
Push 7 → pop 1, then push 7 → [7]
Push 9 → pop 7, then push 9 → [9]
Push 5 → [9, 5] (since 5 < 9, order holds)
 */

// 5. Longest Substring Without Repeating Characters
// Given a string s, find the length of the longest substring without repeating characters.
function lengthOfLongestSubstring(s) {
    const charIndexMap = new Map(); // Map to store the last index of each character
    let left = 0;
    let maxLength = 0;
    for (let right = 0; right < s.length; right++) {
        const currentChar = s[right];
        if (charIndexMap.has(currentChar) && charIndexMap.get(currentChar) >= left) {
            left = charIndexMap.get(currentChar) + 1; 
        }
        charIndexMap.set(currentChar, right);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    return maxLength;
}

// Explanation:
// The function uses a sliding window approach with two pointers (left and right) to track the current substring without repeating characters.
// A map is used to store the last seen index of each character. When a repeating character is found, the left pointer is moved to the right of its last occurrence.
// The maximum length of the substring is updated throughout the iteration.
// Example usage:
const s = "abcabcbb";
console.log(lengthOfLongestSubstring(s)); // Output: 3

// 6. Find second maximum value in stack
function findSecondMaximum(stack) {
    if (stack.length < 2) {
        return null; // Not enough elements for a second maximum
    }
    let max = -Infinity; // Initialize max to the smallest possible value
    let secondMax = -Infinity;
    for (let num of stack) {
        if (num > max) {
            secondMax = max;
            max = num;
        } else if (num > secondMax && num < max) {
            secondMax = num;
        }

    }
    return secondMax === -Infinity ? null : secondMax;
}
// Explanation:
// The function iterates through the stack to find the maximum and second maximum values.
// It updates the maximum and second maximum accordingly, ensuring that the second maximum is less than the maximum.    
// Example usage:
const stack = [3, 1, 4, 4, 5, 2];
console.log(findSecondMaximum(stack)); // Output: 4

// 7. Reverse words in a string
function reverseWords(s) {
    return s.split(' ').reverse().join(' ');
}
// 8. Find the first number in an array that is repeated
function firstRepeatedNumber(arr) {
    const numSet = new Set();
    for (let num of arr) {
        if (numSet.has(num)) {
            return num;
        }
        numSet.add(num);
    }
    return null; // No repeated number found
}
// Explanation:
// The function uses a Set to track numbers that have been seen while iterating through the array.
// When a number is found that already exists in the Set, it is returned as the first repeated number.

// 9. Sort a given list of date string
function sortDateStrings(dateStrings) {
    return dateStrings.sort((a, b) => new Date(a) - new Date(b)); // Convert date strings to Date objects for comparison, then sort, 
}
// Explanation:
// The function sorts an array of date strings by converting each string to a Date object and comparing their time values.
// Example usage:
const dateStrings = ["2023-05-01", "2021-12-15", "2022-07-20"];
console.log(sortDateStrings(dateStrings)); // Output: ["2021-12-15", "2022-07-20", "2023-05-01"]


//10. function logsth() { console.log(this); } new logsth(); what is the value of this
// In this case, when you use the 'new' keyword to create an instance of the function logsth,
// the value of 'this' inside the function refers to the newly created object instance.
// Therefore, when you call new logsth(), it will log an empty object {} to the console,
// which represents the new instance of logsth.

// 11. const cowsound = 'moo'; function makesound() { console.log(cowsound); const cowsound = 'baa'; console.log(cowsound); } what will you see in the console?
// This code will throw a ReferenceError when you try to execute it.
// The reason is that within the makesound function, you are trying to access the variable cowsound before it has been declared and initialized.
// In JavaScript, variable declarations (using var, let, or const) are hoisted to the top of their scope,
// but their initialization is not. Since cowsound is declared with const inside the function, it is in a "temporal dead zone" from the start of the function until its declaration is encountered.
// Therefore, when you try to log cowsound before its declaration, a ReferenceError is thrown indicating that you cannot access it before initialization.
const cowsound = 'moo'; function makesound() { console.log(cowsound); const cowsound = 'baa'; console.log(cowsound); } 
makesound(); // ReferenceError

//  difference between transpilation and polyfill
// Transpilation is the process of converting code from one programming language or version to another, typically to ensure compatibility with different environments. For example, transpiling modern JavaScript (ES6+) to an older version (ES5) so that it can run in browsers that do not support the latest features.
// A polyfill, on the other hand, is a piece of code (usually JavaScript) that implements a feature that is not natively supported in a particular environment. Polyfills are used to add missing functionality to older browsers or environments, allowing developers to use modern features without worrying about compatibility issues.


// which of the data structures can erase from beginning or end in O(1) time? Options are: vector, dequeue, stack, segment tree
// The correct answer is dequeue (double-ended queue). A dequeue allows for efficient insertion and deletion of elements from both the beginning and the end in O(1) time.

