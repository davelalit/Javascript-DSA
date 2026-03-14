/**
 * Monotonic Stack Pattern
 * This pattern is used to solve problems that involve finding the next greater or smaller element in an array.
 * It involves using a stack to keep track of elements in a way that allows efficient access to the next greater or smaller element.
 * Common problems that can be solved using the monotonic stack technique include:
 * 496. Next Greater Element I
 * 503. Next Greater Element II
 * 739. Daily Temperatures
 * 84. Largest Rectangle in Histogram
 */
/** * 496. Next Greater Element I
 * You are given two arrays (without duplicates) nums1 and nums2 where nums1 is a subset of nums2.
 * Find all the next greater numbers for nums1 in the corresponding places of nums2.
 * The next greater number of a number x in nums1 is the first greater number to its right in nums2.
 * If it does not exist, output -1 for this number.
 * Reference: https://leetcode.com/problems/next-greater-element-i/
 * Youtube: https://www.youtube.com/watch?v=2b4c6d8a9e4
 * Example 1:
 * Input: nums1 = [4,1,2], nums2 = [1,3,4,2]
 * Output: [-1,3,-1]
 * Explanation: For number 4 in nums1, there is no greater number to its right in nums2, so the answer is -1.
 * For number 1 in nums1, the next greater number to its right in nums2 is 3.
 * For number 2 in nums1, there is no greater number to its right in nums2, so the answer is -1.
 * Example 2:
 * Input: nums1 = [2,4], nums2 = [1,2,3,4]
 * Output: [3,-1]
 * Explanation: For number 2 in nums1, the next greater number to its right in nums2 is 3.
 * For number 4 in nums1, there is no greater number to its right in nums2, so the answer is -1.
 * Approach:
 * - Use a stack to keep track of indices of elements in nums2.
 * - Iterate through nums2 and for each element, pop elements from the stack until the current element is less than or equal to the top of the stack.
 * - If the stack is not empty, the current element is the next greater element for the index at the top of the stack.
 * - Store the result in a map for quick access.
 * - Finally, map the results for nums1 using the precomputed next greater elements.
 */ 
/* function nextGreaterElement(nums1, nums2) {
    let stack = [];
    let nextGreaterMap = new Map();
    for (let num of nums2) {    
        while (stack.length > 0 && num > stack[stack.length - 1]) {
            nextGreaterMap.set(stack.pop(), num);
        }
        stack.push(num);
    }
    return nums1.map(num => nextGreaterMap.get(num) || -1);
}

console.log(nextGreaterElement([4, 1, 2], [1, 3, 4, 2])); // [-1, 3, -1]
*/

// function nextGreaterElement(nums) {
//     let n = nums.length;
//     let result = new Array(n).fill(-1); // Default to -1 if no greater element exists
//     let stack = []; // Stack stores indices

//     for (let i = 0; i < n; i++) {
//         while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]) {
//             let index = stack.pop();
//             result[index] = nums[i];
//         }
//         stack.push(i);
//         console.log(stack, result);
//     }
//     return result;
// }

// console.log(nextGreaterElement([2, 1, 2, 4, 3])); // [4, 2, 4, -1, 4]

/* * 503. Next Greater Element II
 * Given a circular array (the next element of the last element is the first element of the array), print the Next Greater Number for every element.
 * The Next Greater Number of a number x is the first greater number to its traversing-order in the array.
 * If it does not exist, output -1 for this number.
 * * Reference: https://leetcode.com/problems/next-greater-element-ii/
 * Youtube: https://www.youtube.com/watch?v=2b4c6d8a9e4
 * Example 1:
 * Input: nums = [1,2,1]
 * Output: [2,-1,2]
 * Explanation: The first 1's next greater number is 2; the second 1's next greater number is also 2; there is no greater number for 2.
 * Example 2:
 * Input: nums = [1,2,3,4,3]
 * Output: [2,3,4,-1,4]
 * Explanation: The next greater number for each element is as follows:
 * 1 -> 2, 2 -> 3, 3 -> 4,  4 -> -1, 3 -> 4
 * Approach:
 * - Use a stack to keep track of indices of elements in the circular array.
 * - Iterate through the array twice to simulate the circular nature.
 * - For each element, pop elements from the stack until the current element is less than or equal to the top of the stack.
 * - If the stack is not empty, the current element is the next greater element for the index at the top of the stack.
 * - Store the result in an array.
 */
/* function nextGreaterElements(nums) {
    let n = nums.length;
    let result = new Array(n).fill(-1); // Default to -1 if no greater element exists
    let stack = []; // Stack stores indices

    for (let i = 0; i < 2 * n; i++) {
        let index = i % n; // Use modulo to simulate circular array
        while (stack.length > 0 && nums[index] > nums[stack[stack.length - 1]]) {
            let topIndex = stack.pop();
            result[topIndex] = nums[index];
        }
        if (i < n) { // Only push indices for the first pass
            stack.push(index);
        }
    }
    return result;
}
console.log(nextGreaterElements([1, 2, 1])); // [2, -1, 2]
console.log(nextGreaterElements([1, 2, 3, 4, 3])); // [2, 3, 4, -1, 4]
*/

/** * 739. Daily Temperatures
 * Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.
 * If there is no future day for which this is possible, keep answer[i] == 0 instead.
 * Reference: https://leetcode.com/problems/daily-temperatures/ 
 * Youtube: https://www.youtube.com/watch?v=2b4c6d8a9e4
 * Example 1:
 * Input: temperatures = [73,74,75,71,69,72,76,73]
 * Output: [1,1,4,2,1,1,0,0]
 * Explanation: The next warmer temperature for each day is as follows: 
 * - 73 -> 74 (1 day later)
 * - 74 -> 75 (1 day later)
 * - 75 -> 76 (4 days later)
 * - 71 -> 72 (2 days later)
 * - 69 -> 72 (1 day later)
 * - 72 -> 76 (1 day later)
 * - 76 -> no warmer temperature (0 days later)
 * - 73 -> no warmer temperature (0 days later)
 * Approach:
 * - Use a stack to keep track of indices of temperatures.
 * - Iterate through the temperatures array.
 * - For each temperature, pop elements from the stack until the current temperature is less than or equal to the temperature at the index at the top of the stack.
 * - If the stack is not empty, calculate the number of days to wait for a warmer temperature.
 * - Store the result in an array.
 */
 /* function dailyTemperatures(temperatures) {
    let n = temperatures.length;
    let result = new Array(n).fill(0); // Default to 0 if no warmer temperature exists
    let stack = []; // Stack stores indices

    for (let i = 0; i < n; i++) {
        while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            let index = stack.pop();
            result[index] = i - index; // Calculate the number of days to wait
        }
        stack.push(i);
    }
    return result;
}
console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])); // [1, 1, 4, 2, 1, 1, 0, 0]
*/

/* * 84. Largest Rectangle in Histogram
 * Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle that can be formed in the histogram.
 * Reference: https://leetcode.com/problems/largest-rectangle-in-histogram/
 * Youtube: https://www.youtube.com/watch?v=2b4c6d8a9e4
 * Example 1:
 * Input: heights = [2,1,5,6,2,3]
 * Output: 10
 * Explanation: The largest rectangle can be formed with heights [5,6] which has an area of 10.
 * Example 2:
 * Input: heights = [2,4]
 * Output: 4
 * Explanation: The largest rectangle can be formed with height 4 which has an area of 4.
 * Approach:
 * - Use a stack to keep track of indices of heights.
 * - Iterate through the heights array.
 * - For each height, pop elements from the stack until the current height is less than or equal to the height at the index at the top of the stack.
 * - If the stack is not empty, calculate the area of the rectangle formed by the height at the index at the top of the stack.
 * - Store the maximum area found so far.
 */  
 function largestRectangleArea(heights) {
    let n = heights.length;
    let maxArea = 0;
    let stack = []; // Stack stores indices

    for (let i = 0; i <= n; i++) {
        let currentHeight = i < n ? heights[i] : 0; // Use 0 for the last iteration to pop all remaining elements
        while (stack.length > 0 && currentHeight < heights[stack[stack.length - 1]]) {
            let heightIndex = stack.pop();
            let height = heights[heightIndex];
            let width = stack.length > 0 ? i - stack[stack.length - 1] - 1 : i; // Calculate width
            maxArea = Math.max(maxArea, height * width);
        }
        stack.push(i);
    }
    return maxArea;
}
console.log(largestRectangleArea([2, 1, 5, 6, 2, 3])); // 10
console.log(largestRectangleArea([2, 4])); // 4