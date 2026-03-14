/**
 * Prefix Sum -  * 
 * A technique to calculate the sum of elements in a subarray efficiently.
 * It allows us to preprocess the array so that we can answer sum queries in constant time.
 * This is particularly useful when we have multiple queries on the same array.
 * The prefix sum array is constructed such that each element at index i contains the sum of all elements from the start of the array up to index i.
 * 
 * Common problems that can be solved using prefix sum include:
 * 303. Range Sum Query - Immutable
 * 525. Contiguous Array
 * 560. Subarray Sum Equals K
 * Prefix Sum - Query Sum of elements in a subarray
 * P[i] = A[0]+A[1]+...+A[i]
 * 
 * 303. Range Sum Query - Immutable
 * Given an integer array nums, handle multiple queries of the following type:

    Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.
    Implement the NumArray class:

    NumArray(int[] nums) Initializes the object with the integer array nums.
    int sumRange(int left, int right) Returns the sum of the elements of nums 
    between indices left and right inclusive (i.e. nums[left] + nums[left + 1] + ... + nums[right]).

    Reference: https://leetcode.com/problems/range-sum-query-immutable/
    Youtube: https://www.youtube.com/watch?v=DjYZk8nrXVY

    Refer - https://leetcode.com/problems/range-sum-query-immutable/submissions/1526607064/

 */

/*
var NumArray = function(nums) {
    this.prefixSum = new Array(nums.length);
    this.prefixSum [0] = nums[0];
    for(var i=1; i < nums.length; i++)
    {
        this.prefixSum[i] = nums[i] + this.prefixSum[i-1];
    }
};

NumArray.prototype.sumRange = function(left, right) {
    let rightSum = this.prefixSum[right];
    let leftSum = left > 0 ? this.prefixSum[left - 1] : 0;

    return rightSum - leftSum;
};

var numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
console.log(numArray.sumRange(0, 2)); // return (-2) + 0 + 3 = 1
console.log(numArray.sumRange(2, 5)); // return 3 + (-5) + 2 + (-1) = -1
console.log(numArray.sumRange(0, 5)); // return (-2) + 0 + 3 + (-5) + 2 + (-1) = -3
*/

/* 525. Contiguous Array - Prefix Sum
    * Given a binary array nums, return the maximum length of a contiguous subarray with an equal number of 0 and 1.
    * 
    * Reference: https://leetcode.com/problems/contiguous-array/
    * Youtube: https://www.youtube.com/watch?v=2b4c6d8a9e4
    * 
    * Approach:
    * - Convert 0s to -1s to use prefix sum technique.
    * - Use a hashmap to store the first occurrence of each prefix sum.
    * - If the same prefix sum occurs again, it means the subarray between these two indices has equal number of 0s and 1s.
    * 
    * Example:
    * Input: nums = [0,1,1,1,1,1,0,0,0]
    * Output: 6
    * Explanation: [1,1,1,0,0,0] is the longest contiguous subarray with equal number of 0 and 1.
    */

/* var findMaxLength = function(nums) {
    let prefixSum = 0;
    let maxLength = 0;
    const map = new Map(); // Use a hashmap to store the first occurrence of each prefix sum.
    map.set(0, -1); // Initialize with prefix sum 0 at index -1 to handle cases where the entire array is valid.

    for (let i = 0; i < nums.length; i++) {
        // Convert 0s to -1s
        prefixSum += nums[i] === 0 ? -1 : 1;

        if (map.has(prefixSum)) {
            // If this prefix sum has been seen before, calculate the length of the subarray
            maxLength = Math.max(maxLength, i - map.get(prefixSum));
        } else {
            // Store the first occurrence of this prefix sum
            map.set(prefixSum, i);
        }
    }

    return maxLength;
}
console.log(findMaxLength([0, 1, 0, 1, 0, 1, 0, 0, 0, 1])); // Output: 6
*/

/* 560. Subarray Sum Equals K - Prefix Sum
    * Given an array of integers nums and an integer k, return the total number of continuous subarrays whose sum equals to k.
    * 
    * Reference: https://leetcode.com/problems/subarray-sum-equals-k/
    * Youtube: https://www.youtube.com/watch?v=2b4c6d8a9e4
    * 
    * Approach:
    * - Use a hashmap to store the frequency of prefix sums.
    * - For each element, calculate the current prefix sum and check if (currentPrefixSum - k) exists in the hashmap.
    * - If it exists, it means there are subarrays ending at the current index that sum to k.
    * Example:
    * Input: nums = [1,1,1], k = 2
    * Output: 2
    */
var subarraySum = function(nums, k) {
    let prefixSum = 0;
    let count = 0;
    const map = new Map(); // Use a hashmap to store the frequency of prefix sums.
    map.set(0, 1); // Initialize with prefix sum 0 to handle cases where the subarray starts from index 0.

    for (let i = 0; i < nums.length; i++) {
        prefixSum += nums[i];

        // Check if (prefixSum - k) exists in the hashmap
        if (map.has(prefixSum - k)) {
            count += map.get(prefixSum - k);
        }

        // Update the frequency of the current prefix sum
        map.set(prefixSum, (map.get(prefixSum) || 0) + 1);
    }

    return count;
}
console.log(subarraySum([1, 1, 1], 2)); // Output: 2
