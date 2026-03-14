
/** 
 * Two Pointers Pattern - * 
 * This pattern is used to solve problems that involve searching for pairs or triplets in a sorted array.
 * It involves using two pointers that move towards each other or away from each other based on the conditions of the problem.
 * Common problems that can be solved using the two pointers technique include:
 * 167. Two Sum II - Input Array is Sorted
 * 15. 3 Sum
 * 11. Container with most water
 * 
 * 1. 167. Two Sum II - Input Array is Sorted
 * Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, 
 * find two numbers such that they add up to a specific target number. 
 * Let these two numbers be numbers[index1] and numbers[index2] where 1 <= index1 < index2 <= numbers.length.
 * Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of length 2.
 * The tests are generated such that there is exactly one solution. You may not use the same element twice.
 * Your solution must use only constant extra space.
 * 
 * Example 1:

Input: numbers = [2,7,11,15], target = 9
Output: [1,2]
Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].
Example 2:

Input: numbers = [2,3,4], target = 6
Output: [1,3]
Explanation: The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3].
Example 3:

Input: numbers = [-1,0], target = -1
Output: [1,2]
Explanation: The sum of -1 and 0 is -1. Therefore index1 = 1, index2 = 2. We return [1, 2].

Refer - https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/submissions/1528839647/
*/

/*var twoSum = function(numbers, target) {
    var i = 0, j = numbers.length - 1;
    var sum = 0;
    while(i <= j){
        sum = numbers[i] + numbers[j];
        if(sum == target)
          return [i+1, j+1]
        if(sum > target)  
           j--;
        else
           i++;   
    }
    return [];
};

console.log(twoSum([2,7,11,15], 9)); // [1, 2]
*/

/* 15. 3 Sum 
    * Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, 
    * and nums[i] + nums[j] + nums[k] == 0.
    * 
    * Note: The solution set must not contain duplicate triplets.
    * 
    * Example:
    * Input: nums = [-1,0,1,2,-1,-4]
    * Output: [[-1,-1,2],[-1,0,1]]
    * 
    * Reference: https://leetcode.com/problems/3sum/
    * Youtube: https://www.youtube.com/watch?v=6iF8Xb7Z3wQ
    */

/* var threeSum = function(nums) {
    nums.sort((a, b) => a - b); // Sort the array to use two pointers technique
    const result = [];
    
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue; // Skip duplicates
        
        let left = i + 1;
        let right = nums.length - 1;
        
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left + 1]) left++; // Skip duplicates
                while (left < right && nums[right] === nums[right - 1]) right--; // Skip duplicates
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
console.log(threeSum([-1,0,1,2,-1,-4])); // [[-1,-1,2],[-1,0,1]]
*/

/* 11. Container with most water
    * Given n non-negative integers a1, a2, ..., an, where each represents a point at coordinate (i, ai). 
    * n vertical lines are drawn such that the two endpoints of line i is at (i, ai) and (i, 0). 
    * Find two lines, which together with x-axis forms a container, such that the container contains the most water.
    * 
    * Note: You may not slant the container.
    * 
    * Example:
    * Input: height = [1,8,6,2,5,4,8,3,7]
    * Output: 49
    * Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
    * 
    * Reference: https://leetcode.com/problems/container-with-most-water/
    * Youtube: https://www.youtube.com/watch?v=OaPj9c9bX6g
    */

var maxArea = function(height) {
    let left = 0;
    let right = height.length - 1;
    let maxArea = 0;

    while (left < right) {
        const width = right - left;
        const currentHeight = Math.min(height[left], height[right]);
        const area = width * currentHeight;
        maxArea = Math.max(maxArea, area);

        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return maxArea;
}
console.log(maxArea([1,8,6,2,5,4,8,3,7])); // 49