/* Common Array Concepts and Techniques Covered in LeetCode Problems:
1. Traversal and Iteration:
Basic loops to access and process elements.
2. Searching:
Finding specific elements (e.g., linear search, binary search on sorted arrays).
3. Sorting:
Arranging elements in a specific order (e.g., using built-in sort functions, implementing sorting algorithms like bubble sort, merge sort, quick sort).
4. Two Pointers:
Using two pointers to efficiently traverse and manipulate arrays, often in sorted arrays or for finding pairs/subarrays.
5. Sliding Window:
A technique for processing contiguous subarrays or subsequences, often used for optimization in problems involving sums, maximums, or minimums within a window.
6. Prefix Sums:
Pre-calculating sums of prefixes to efficiently calculate sums of subarrays.
7. Hashing/Hash Maps:
Using hash tables to store and retrieve element frequencies, indices, or relationships.
8. Dynamic Programming:
Solving problems by breaking them down into smaller overlapping subproblems and storing their solutions to avoid recomputation.
9. Greedy Algorithms:
Making locally optimal choices in the hope of finding a globally optimal solution.
10. Manipulation and Transformation:
Problems involving modifying array elements, rotating arrays, or rearranging elements.

Two Pointers:
This technique involves using two pointers that traverse the array, often from opposite ends or at different speeds, to find pairs, triplets, or other combinations that satisfy a specific condition. It is particularly effective on sorted arrays.
Sliding Window:
The sliding window pattern is used to process a contiguous sub-array (or "window") of a fixed or variable size within a larger array. The window "slides" through the array, allowing for efficient calculations like finding maximum/minimum sums or frequencies within a given range.
Prefix Sum / Cumulative Sum:
This pattern pre-computes the sum of elements up to each index in an array. This allows for constant-time calculation of the sum of any sub-array, which is useful in problems requiring frequent range sum queries.
Binary Search:
When dealing with sorted arrays, binary search provides an efficient way to find a specific element or determine its presence. It works by repeatedly dividing the search interval in half.
Sorting:
While not a pattern in itself, sorting the array is often a crucial pre-processing step that enables the application of other patterns like Two Pointers or Binary Search, as it organizes the data in a way that allows for more efficient algorithms.
Hashing:
Using hash tables (or dictionaries/maps) with arrays can help in quickly checking for the presence of elements, counting frequencies, or storing key-value pairs related to array elements, leading to optimized solutions for problems like finding duplicates or unique elements.
Kadane's Algorithm:
This dynamic programming algorithm is specifically designed to find the maximum sum of a contiguous sub-array within a one-dimensional array of numbers.
*/

// 1. Two Sum: Find two numbers in an array that add up to a target sum.
// Time Complexity: O(n), Space Complexity: O(n)
// This problem is often solved using a hash map to store the indices of the elements.
/* function twoSum(nums, target) {
    const seen = {}; // Store value => index

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (seen.hasOwnProperty(complement)) {
            return [seen[complement], i];
        }
        seen[nums[i]] = i;
    }

    return []; // No valid pair found
}

// Example usage
const nums = [2, 7, 11, 15];
const target = 9;
console.log(twoSum(nums, target)); // Output: [0, 1]
*/

// 2. Container With Most Water: Find the two lines that together with the x-axis form a container, such that the container contains the most water.
/** * This problem can be solved using the two-pointer technique, where we start with pointers at both ends of the array and move them towards each other, calculating the area at each step. The area is determined by the shorter line and the distance between the two pointers. 
 * We keep track of the maximum area found during the process. */
// Time Complexity: O(n), Space Complexity: O(1)
/* function maxArea(height) {
    let maxWater = 0;
    let left = 0;
    let right = height.length - 1;

    while (left < right) {
        const width = right - left;
        const currentHeight = Math.min(height[left], height[right]);
        const currentWater = width * currentHeight;

        maxWater = Math.max(maxWater, currentWater);

        // Move the pointer at the shorter line
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return maxWater;
}

// Example usage
const heights = [1, 8, 6, 2, 5, 4, 8, 3, 7];
console.log(maxArea(heights)); // Output: 49
*/

// 3. Maximum Subarray: Find the contiguous subarray within an array that has the largest sum.
// This problem can be solved using Kadane's algorithm, which iterates through the array while maintaining the maximum sum ending at each index and the overall maximum found so far.
// Time Complexity: O(n), Space Complexity: O(1)
/* function maxSubArray(nums) {
    let maxSoFar = nums[0]; // tracks the maximum sum ending at current index
    let currentMax = nums[0]; // tracks the overall maximum found so far.

    for (let i = 1; i < nums.length; i++) {
        currentMax = Math.max(nums[i], currentMax + nums[i]);
        maxSoFar = Math.max(maxSoFar, currentMax);
    }

    return maxSoFar;
}

// Example usage:
const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(maxSubArray(arr)); // Output: 6

// Return subarray with maximum sum
function maxSubArrayWithSublist(nums) {
    let maxSoFar = nums[0];
    let currentMax = nums[0];
    let start = 0;
    let end = 0;
    let tempStart = 0;

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > currentMax + nums[i]) {
            currentMax = nums[i];
            tempStart = i;
        } else {
            currentMax += nums[i];
        }

        if (currentMax > maxSoFar) {
            maxSoFar = currentMax;
            start = tempStart;
            end = i;
        }
    }

    const subarray = nums.slice(start, end + 1); // slice method selects elements from the start argument, and up to (but not including) the end argument.
    return { maxSum: maxSoFar, subarray };
}

// Example usage:
const arr2 = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
const result = maxSubArrayWithSublist(arr2);
console.log(result);
// Output: { maxSum: 6, subarray: [4, -1, 2, 1] }
*/

// 4. Rotate Array: Rotate an array to the right by k steps.
// This can be done by reversing parts of the array. First, reverse the entire array, then reverse the first k elements and finally reverse the remaining n-k elements.
// Time Complexity: O(n), Space Complexity: O(1)
/* function rotateArray(arr, k) {
    const n = arr.length;
    if (n === 0) return arr;

    k = k % n; // Normalize k in case it's larger than array length

    const rotated = arr.slice(-k).concat(arr.slice(0, n - k));
    return rotated;
}

// Example usage:
const original = [1, 2, 3, 4, 5, 6, 7];
const steps = 3;
console.log(rotateArray(original, steps)); // Output: [5, 6, 7, 1, 2, 3, 4]

function reverse(arr, start, end) {
    while (start < end) {
        [arr[start], arr[end]] = [arr[end], arr[start]]; // Swap
        start++;
        end--;
    }
}

function rotateInPlace(arr, k) {
    const n = arr.length;
    if (n === 0) return;

    k = k % n; // Normalize k

    // Step 1: Reverse the entire array
    reverse(arr, 0, n - 1);

    // Step 2: Reverse the first k elements
    reverse(arr, 0, k - 1);

    // Step 3: Reverse the rest
    reverse(arr, k, n - 1);
}

// Example usage:
const nums = [1, 2, 3, 4, 5, 6, 7];
rotateInPlace(nums, 3);
console.log(nums); // Output: [5, 6, 7, 1, 2, 3, 4]
*/

// 5. Merge Sorted Array: Merge two sorted arrays into a single sorted array.
// This can be done using a two-pointer technique, where we compare elements from both arrays and build the merged array.
// Time Complexity: O(n + m), Space Complexity: O(n + m)
/* function mergeSortedArrays(arr1, arr2) {
    return [...arr1, ...arr2].sort((a, b) => a - b); // Using spread operator to combine and sort
}

// Example usage:
const a1 = [1, 3, 5];
const b1 = [2, 4, 6];
console.log(mergeSortedArrays(a1, b1)); // Output: [1, 2, 3, 4, 5, 6]

// In-place merge of two sorted arrays 
// Efficient Merge Without Extra Sorting (Two-pointer technique)
function mergeSortedArrays(arr1, arr2) {
    const merged = [];
    let i = 0, j = 0;

    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            merged.push(arr1[i++]);
        } else {
            merged.push(arr2[j++]);
        }
    }

    // Add remaining elements
    while (i < arr1.length) merged.push(arr1[i++]);
    while (j < arr2.length) merged.push(arr2[j++]);

    return merged;
}

// Example usage:
const a = [1, 3, 5];
const b = [2, 4, 6];
console.log(mergeSortedArrays(a, b)); // Output: [1, 2, 3, 4, 5, 6]
*/

// 6. Find All Duplicates in an Array: Find all elements that appear twice in an array where elements are in a specific range.
// In-place marking can be used to track duplicates by negating the value at the index corresponding to each element.
// Time Complexity: O(n), Space Complexity: O(1)
function findDuplicates(nums) {
    const duplicates = [];

    for (let i = 0; i < nums.length; i++) {
        const index = Math.abs(nums[i]) - 1;

        if (nums[index] < 0) {
            // Already marked negative → duplicate found
            duplicates.push(index + 1);
        } else {
            // Mark visited index
            nums[index] = -nums[index];
        }
    }

    return duplicates;
}

// Example usage:
const arr = [4, 3, 2, 7, 8, 2, 3, 1];
console.log(findDuplicates(arr)); // Output: [2, 3]


 function findDuplicates(nums) {
    const seen = new Set();
    const duplicates = [];

    for (const num of nums) {
        if (seen.has(num)) {
            duplicates.push(num);
        } else {
            seen.add(num);
        }
    }

    return duplicates;
}
// Example usage:
const nums = [4, 3, 2, 7, 8, 2, 3, 1];
console.log(findDuplicates(nums)); // Output: [2, 3]

