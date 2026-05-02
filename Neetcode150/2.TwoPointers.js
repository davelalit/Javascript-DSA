// https://neetcode.io/practice/practice/neetcode150

// Valid Palindrome
// Remove non-alphanumeric characters, convert to lowercase, then use two pointers to check if the string reads the same forward and backward. Time: O(n), Space: O(1)

var isPalindrome = function(s) {
    s = s.replace(/[^a-z0-9]/gi, '').toLowerCase();
    let left = 0, right = s.length - 1;
    while (left < right) {
        if (s[left] !== s[right]) return false;
        left++;
        right--;
    }
    return true;
};
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true

// Two Sum II – Input Array Is Sorted
// Since the array is sorted, use two pointers. If sum is too small, move left pointer; if too large, move right pointer. Time: O(n), Space: O(1)
var twoSum = function(numbers, target) {
    let left = 0, right = numbers.length - 1;
    while (left < right) {
        let sum = numbers[left] + numbers[right];
        if (sum === target) return [left + 1, right + 1];
        else if (sum < target) left++;
        else right--;
    }
};
console.log(twoSum([2, 7, 11, 15], 9)); // [1, 2]

//  3Sum
// Sort the array, fix one number, then use two pointers to find pairs that sum to . Skip duplicates to avoid repeated triplets. Time: O(n²).
var threeSum = function(nums) {
    nums.sort((a, b) => a - b);
    const res = [];
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue; // skip duplicates
        let left = i + 1, right = nums.length - 1;
        while (left < right) {
            let sum = nums[i] + nums[left] + nums[right];
            if (sum === 0) {
                res.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                left++; right--;
            } else if (sum < 0) left++;
            else right--;
        }
    }
    return res;
};
console.log(threeSum([-1, 0, 1, 2, -1, -4])); // [[-1, -1, 2], [-1, 0, 1]]


// Container With Most Water
// Use two pointers at both ends. Move the pointer with the smaller height inward to maximize area. Time: O(n).
var maxArea = function(height) {
    let left = 0, right = height.length - 1, max = 0;
    while (left < right) {
        let area = Math.min(height[left], height[right]) * (right - left);
        max = Math.max(max, area);
        if (height[left] < height[right]) left++;
        else right--;
    }
    return max;
};
console.log(maxArea([1,8,6,2,5,4,8,3,7])); // 49

// Trapping Rain Water
// Two-pointer approach: track max height seen from left and right. Water trapped depends on the smaller of the two maxes. Time: O(n), Space: O(1)

var trap = function(height) {
    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax = 0, water = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) leftMax = height[left];
            else water += leftMax - height[left];
            left++;
        } else {
            if (height[right] >= rightMax) rightMax = height[right];
            else water += rightMax - height[right];
            right--;
        }
    }
    return water;
};
console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1])); // 6