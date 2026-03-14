/**
 * Modified Binary Search Pattern
 * This pattern is used to solve problems that involve searching in a sorted array or finding an element in a modified binary search scenario.
 * It is particularly useful when the array is rotated or has some modifications that prevent a straightforward binary search.
 * Common problems that can be solved using the modified binary search technique include: * 
 * 33. Search in Rotated Sorted Array
 * 153. Find Minimum in Rotated Sorted Array
 * 240. Search a 2D Matrix II
 * 74. Search a 2D Matrix
 * 278. First Bad Version
 * 4. Median of Two Sorted Arrays
 * 162. Find Peak Element
 * * The modified binary search technique involves:
 * - Identifying the pivot point in a rotated array.
 * - Adjusting the search range based on the properties of the modified array.
 * - Using binary search principles to efficiently find the target element or condition. * 
 */

/** * 33. Search in Rotated Sorted Array
 * Given an integer array nums sorted in ascending order, where the array is possibly rotated at some pivot unknown to you beforehand, and an integer target, return the index of target in nums, or -1 if it is not in nums.
 * You must write an algorithm with O(log n) runtime complexity.
 * Reference: https://leetcode.com/problems/search-in-rotated-sorted-array/
 * Youtube: https://www.youtube.com/watch?v=2b4c6d8a9e4
 * Example 1:
 * Input: nums = [4,5,6,7,0,1,2], target = 0
 * Output: 4
 * Explanation: The target 0 is found at index 4 in the rotated array.    
 * Example 2:
 * Input: nums = [4,5,6,7,0,1,2], target = 3
 * Output: -1   
 * Approach:
 * - Use binary search to find the pivot point where the array is rotated.
 * - Compare the target with the middle element and adjust the search range based on whether the left or right half is sorted.
 * - Continue the search in the appropriate half until the target is found or the search range is exhausted.
 */
/* function search(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] === target) {
            return mid;
        }

        // Check if the left half is sorted
        if (nums[left] <= nums[mid]) {
            // Target is in the left half
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else { // Right half is sorted
            // Target is in the right half
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }

    return -1; // Target not found
}
console.log(search([4, 5, 6, 7, 0, 1, 2], 0)); // Output: 4
*/

/* 153. Find Minimum in Rotated Sorted Array
    * Given an integer array nums sorted in ascending order and possibly rotated at some pivot unknown to you beforehand, return the minimum element of this array.
    * You must write an algorithm that runs in O(log n) time.
    * Reference: https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/
    * Youtube: https://www.youtube.com/watch?v=2b4c6d8a9e4
    * Example 1:
    * Input: nums = [3,4,5,1,2]
    * Output: 1
    * Explanation: The minimum element is 1.
    * Example 2:
    * Input: nums = [4,5,6,7,0,1,2]
    * Output: 0
    * Explanation: The minimum element is 0.
    */
/* function findMin(nums) {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        // If the middle element is greater than the rightmost element,
        // the minimum must be in the right half.
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else { // Otherwise, the minimum is in the left half or at mid.
            right = mid;
        }
    }

    return nums[left]; // The minimum element is at the left pointer.
}
console.log(findMin([3, 4, 5, 1, 2])); // Output: 1
console.log(findMin([4, 5, 6, 7, 0, 1, 2])); // Output: 0
*/

/* 240. Search a 2D Matrix II
 * Write an efficient algorithm that searches for a value in an m x n matrix. This matrix
    * has the following properties:
    * Integers in each row are sorted in ascending from left to right.
    * Integers in each column are sorted in ascending from top to bottom.
    * Reference: https://leetcode.com/problems/search-a-2d-matrix-ii/
    * Youtube: https://www.youtube.com/watch?v=2b4c6d8a9e4
    * Example 1:
    * Input: matrix = [[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]], target = 5
    * Output: true
    * Explanation: The target 5 is found in the matrix.
    * Example 2:    
    * Input: matrix = [[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]], target = 20
    * Output: false
    * Approach:
    * - Start from the top-right corner of the matrix.
    * - Compare the target with the current element.
    * - If the target is smaller, move left; if larger, move down.
    * - Continue until the target is found or the search space is exhausted.
    */
/* function searchMatrix(matrix, target) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) return false;

    let row = 0;
    let col = matrix[0].length - 1;

    while (row < matrix.length && col >= 0) {
        const current = matrix[row][col];

        if (current === target) {
            return true; // Target found
        } else if (current > target) {
            col--; // Move left
        } else {
            row++; // Move down
        }
    }

    return false; // Target not found
}
console.log(searchMatrix([[1, 4, 7, 11], [2, 5, 8, 12], [3, 6, 9, 16], [10, 13, 14, 17]], 5)); // Output: true
console.log(searchMatrix([[1, 4, 7, 11], [2, 5, 8, 12], [3, 6, 9, 16], [10, 13, 14, 17]], 20)); // Output: false
*/

/* 74. Search a 2D Matrix
 * Write an efficient algorithm that searches for a value in an m x n matrix. This matrix
 * has the following properties:
 * Integers in each row are sorted in ascending order.
 * Integers in each column are sorted in ascending order.
 * Reference: https://leetcode.com/problems/search-a-2d-matrix/
 * Youtube: https://www.youtube.com/watch?v=2b4c6d8a9e4
 * Example 1:
 * Input: matrix = [[1,3,5],[7,9,11],[12,14,16]], target = 9
 * Output: true
 * Explanation: The target 9 is found in the matrix.
 * Example 2:
 * Input: matrix = [[1,3,5],[7,9,11],[12,14,16]], target = 10
 * Output: false
 * Approach:
 * - Use binary search on the entire matrix by treating it as a single sorted array.
 */
/* function searchMatrix(matrix, target) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) return false;

    let left = 0;
    let right = matrix.length * matrix[0].length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midValue = matrix[Math.floor(mid / matrix[0].length)][mid % matrix[0].length];

        if (midValue === target) {
            return true; // Target found
        } else if (midValue < target) {
            left = mid + 1; // Search in the right half
        } else {
            right = mid - 1; // Search in the left half
        }
    }

    return false; // Target not found
}
console.log(searchMatrix([[1, 3, 5], [7, 9, 11], [12, 14, 16]], 9)); // Output: true
console.log(searchMatrix([[1, 3, 5], [7, 9, 11], [12, 14, 16]], 10)); // Output: false
*/

/* 278. First Bad Version
 * You are a product manager and currently leading a team to develop a new product. Unfortunately,
    * the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.
    * Suppose you have n versions [1, 2, ..., n] and you want to find out the first bad one, which causes all the following ones to be bad.
    * You are given an API bool isBadVersion(version) which returns whether version is bad. Implement a function to find the first bad version.
    * You should minimize the number of calls to the API.
    * Reference: https://leetcode.com/problems/first-bad-version/
    * Youtube: https://www.youtube.com/watch?v=2b4c6d8a9e4
    * Example 1:
    * Input: n = 5, bad = 4
    * Output: 4
    * Explanation: The first bad version is 4.
    * Example 2:
    * Input: n = 1, bad = 1
    * Output: 1
    * Approach:
    * - Use binary search to find the first bad version.
    * - Start with the range from 1 to n.
    * - Check the middle version using the isBadVersion API.
    * - If it is bad, move the right pointer to mid; otherwise, move the left pointer to mid + 1.
    */
/* function isBadVersion(version) {
    // This is a mock function. In a real scenario, this would be provided by the platform.
    const badVersion = 4; // Example bad version    
    return version >= badVersion;
}   
function firstBadVersion(n) {
    let left = 1;
    let right = n;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        if (isBadVersion(mid)) {
            right = mid; // Move left to find the first bad version
        } else {
            left = mid + 1; // Move right to find the first bad version
        }
    }

    return left; // The first bad version is at the left pointer
}   
console.log(firstBadVersion(5)); // Output: 4
console.log(firstBadVersion(1)); // Output: 1
*/

/* 4. Median of Two Sorted Arrays
 * Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.
 * The overall run time complexity should be O(log (m+n)).
 * Reference: https://leetcode.com/problems/median-of-two-sorted-arrays/
 * Youtube: https://www.youtube.com/watch?v=2b4c6d8a9e4
 * Example 1:
 * Input: nums1 = [1,3], nums2 = [2]
 * Output: 2.00000
 * Explanation: The median is 2.0.
 * Example 2:
 * Input: nums1 = [1,2], nums2 = [3,4]
 * Output: 2.50000
 * Explanation: The median is (2 + 3) / 2 = 2.5.
 * Approach:
 * - Use binary search to partition the two arrays into left and right halves.
 * - Ensure that the maximum of the left half is less than or equal to the minimum of the right half.
 * - Calculate the median based on the partitioning.
 */
 
/* function findMedianSortedArrays(nums1, nums2) {
    const totalLength = nums1.length + nums2.length;
    const half = Math.floor(totalLength / 2);
    let left = 0;
    let right = nums1.length;

    while (left <= right) {
        const partitionX = Math.floor((left + right) / 2);
        const partitionY = half - partitionX;

        const maxX = partitionX === 0 ? -Infinity : nums1[partitionX - 1];
        const minX = partitionX === nums1.length ? Infinity : nums1[partitionX];

        const maxY = partitionY === 0 ? -Infinity : nums2[partitionY - 1];
        const minY = partitionY === nums2.length ? Infinity : nums2[partitionY];

        if (maxX <= minY && maxY <= minX) {
            // Found the correct partitions
            if (totalLength % 2 === 0) {
                return (Math.max(maxX, maxY) + Math.min(minX, minY)) / 2;
            } else {
                return Math.max(maxX, maxY);
            }
        } else if (maxX > minY) {
            right = partitionX - 1; // Move towards the left in nums1
        } else {
            left = partitionX + 1; // Move towards the right in nums1
        }
    }

    throw new Error("Input arrays are not sorted or valid");
}
console.log(findMedianSortedArrays([1, 3], [2])); // Output: 2.0
console.log(findMedianSortedArrays([1, 2], [3, 4]));    // Output: 2.5
console.log(findMedianSortedArrays([0, 0], [0, 0])); // Output: 0.0
console.log(findMedianSortedArrays([], [1])); // Output: 1.0    
*/

/* 162. Find Peak Element 
    * A peak element is an element that is strictly greater than its neighbors.
    * Given an integer array nums, find a peak element, and return its index.
    * If the array contains multiple peaks, return the index of any one of them.
    * You may imagine that nums[-1] = nums[n] = -∞.
    * You must write an algorithm that runs in O(log n) time.
    * Reference: https://leetcode.com/problems/find-peak-element/
    * Youtube: https://www.youtube.com/watch?v=2b4c6d8a9e4
    * Example 1:
    * Input: nums = [1,2,3,1]
    * Output: 2
    * Explanation: The peak element is 3 at index 2.
    * Example 2:
    * Input: nums = [1,2,1,3,5,6,4]
    * Output: 5
    * Explanation: The peak element is 6 at index 5.
    */
 function findPeakElement(nums) {
    let left = 0;
    let right = nums.length - 1;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        // Check if the middle element is greater than its next element
        if (nums[mid] > nums[mid + 1]) {
            right = mid; // Move left to find a peak in the left half
        } else {
            left = mid + 1; // Move right to find a peak in the right half
        }
    }   
    return left; // The peak element is at the left pointer
}
console.log(findPeakElement([1, 2, 3, 1])); // Output: 2
console.log(findPeakElement([1, 2, 1, 3, 5, 6, 4])); // Output: 5
console.log(findPeakElement([1, 2, 3, 4, 5  ])); // Output: 4
console.log(findPeakElement([5, 4, 3, 2, 1  ])); // Output: 0
console.log(findPeakElement([1, 2, 3, 4, 5  , 6])); // Output: 5
console.log(findPeakElement([6, 5, 4, 3, 2  , 1])); // Output: 0     
