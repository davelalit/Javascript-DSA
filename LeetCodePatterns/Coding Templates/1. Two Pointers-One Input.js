// 1. Two pointers: one input, opposite ends

let fn = arr => {
    let left = 0, ans = 0, right = arr.length - 1;

    while (left < right) {
        // do some logic here with left and right
        if (CONDITION) {
            left++;
        } else {
            right--;
        }
    }

    return ans;
}

// 1. Valid Palindrome (Easy - #125)
// Compare characters at left and right pointers, move inward.

let isPalindrome = s => {
    // Pre-processing: remove non-alphanumeric and lowercase (standard LeetCode requirement)
    s = s.replace(/[^a-z0-9]/gi, '').toLowerCase();
    
    let left = 0;
    let right = s.length - 1;
    let ans = true; // Initialize ans as true

    while (left < right) {
        // Logic: Compare characters at the opposite ends
        if (s[left] === s[right]) {
            // If they match, move both toward the center
            left++;
            right--;
        } else {
            // If they don't match, it's not a palindrome
            ans = false;
            break; 
        }
    }

    return ans;
};

console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false

// 344. Reverse String (Easy - #344)
// Swap left and right characters until pointers meet.
let reverseString = s => {
    let left = 0, right = s.length - 1;
    s = s.split(''); // Convert string to array for in-place modification

    while (left < right) {
        // Logic: Swap characters at the opposite ends
        [s[left], s[right]] = [s[right], s[left]];
        left++;
        right--;
    }
    return s.join(''); // Convert array back to string
};

console.log(reverseString("hello")); // "olleh"
console.log(reverseString("Hannah")); // "hannaH"

// 11. Container With Most Water (Medium - #11)
// Start with widest container (left & right ends), move inward based on shorter line.
// Find two lines that together with the x-axis form a container holding the most water.
let maxContainerWaterArea = height => {
    let left = 0, right = height.length - 1;
    let ans = 0;

    while (left < right) {
        // Logic: Calculate area and update ans
        let width = right - left;
        let currentArea = Math.min(height[left], height[right]) * width;
        ans = Math.max(ans, currentArea);
        // Move the pointer of the shorter line inward
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return ans;
};

console.log(maxContainerWaterArea([1,8,6,2,5,4,8,3,7])); // 49
console.log(maxContainerWaterArea([1,1])); // 1

// 167. Two Sum II – Input Sorted (Medium - #167)
// Compare sum of left & right pointers, adjust accordingly.
// Given a 1-indexed array of integers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Return the indices of the two numbers (1-indexed) as an integer array answer of size 2, where 1 <= answer[0] < answer[1] <= numbers.length.
//
let twoSumSorted = (numbers, target) => {
    let left = 0, right = numbers.length - 1;
    let ans = [];

    while (left < right) {
        // Logic: Calculate sum and compare with target
        let currentSum = numbers[left] + numbers[right];

        if (currentSum === target) {
            // Return 1-indexed indices
            return [left + 1, right + 1];
        } else if (currentSum < target) {
            left++;
        } else {
            right--;
        }
    }

    return ans;
};

console.log(twoSumSorted([2, 7, 11, 15], 9)); // [1, 2]
console.log(twoSumSorted([2, 3, 4], 6)); // [1, 3]


// 680. Valid Palindrome II (Easy - #680)
// Similar to palindrome check, but allow one mismatch skip.
// Given a string s, return true if the s can be palindrome after deleting at most one character from it.
let validPalindromeWithOneDeletion = s => {
    let left = 0, right = s.length - 1;
    while (left < right) {
        if (s[left] === s[right]) {
            left++;
            right--;
        }
        else {            // Try skipping left character or right character
            return isPalindrome(s.substring(left + 1, right + 1)) || isPalindrome(s.substring(left, right));
        }
    }
    return true; // If we exit the loop without finding a mismatch, it's already a palindrome
};
isPalindrome = s => {
    let left = 0, right = s.length - 1;
    while (left < right) {
        if (s[left] !== s[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
};

console.log(validPalindromeWithOneDeletion("abca")); // true (remove 'c')
console.log(validPalindromeWithOneDeletion("abc")); // false (need to remove two characters)


// 15. 3Sum (with sorting)  
// Find triplets that sum to zero.
// Fix one number, then use opposite-end two pointers for the remaining pair.
let threeSum = arr => {
    let left = 0, ans = 0, right = arr.length - 1;
    arr.sort((a, b) => a - b); // Sort the array first

    for (let i = 0; i < arr.length - 2; i++) {
        if (i > 0 && arr[i] === arr[i - 1]) continue; // Skip duplicates
        left = i + 1;
        right = arr.length - 1;
        while (left < right) {
            let sum = arr[i] + arr[left] + arr[right];
            if (sum === 0) {
                ans.push([arr[i], arr[left], arr[right]]);
                while (left < right && arr[left] === arr[left + 1]) left++; // Skip duplicates
                while (left < right && arr[right] === arr[right - 1]) right--;
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }   
        }
    }   
    return ans;     
};

console.log(threeSum([-1,0,1,2,-1,-4])); // [[-1,-1,2],[-1,0,1]]
console.log(threeSum([0,1,1])); // []


// 16. 3Sum Closest (with sorting)
// Same as 3Sum, but track closest sum.
// Given an integer array nums of length n and an integer target, 
// find three integers in nums such that the sum is closest to target. 
// Return the sum of the three integers. You may assume that each input would have exactly one solution.
let threeSumClosest = (arr, target) => {
    let left = 0, ans = 0, right = arr.length - 1;
    arr.sort((a, b) => a - b);
    let closest = Infinity;

    for (let i = 0; i < arr.length - 2; i++) {
        if (i > 0 && arr[i] === arr[i - 1]) continue; // Skip duplicates
        left = i + 1;
        right = arr.length - 1;
        while (left < right) {
            let sum = arr[i] + arr[left] + arr[right];
            if (Math.abs(sum - target) < Math.abs(closest - target)) {
                closest = sum;
            }
            if (sum === target) {
                return sum; // Found exact match
            }
            else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
    }
    return closest;
};

console.log(threeSumClosest([-1,2,1,-4], 1)); // 2 (-1 + 2 + 1 = 2)
console.log(threeSumClosest([0,0,0], 1)); // 0 (0 + 0 + 0 = 0)


// 18. 4Sum (with sorting)
// Similar to 3Sum, but with an extra loop for the fourth number.
// Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that:
// 0 <= a, b, c, d < n
// a, b, c, and d are distinct.
// nums[a] + nums[b] + nums[c] + nums[d] == target
let fourSum = (arr, target) => {
    let left = 0, ans = 0, right = arr.length - 1;
    arr.sort((a, b) => a - b);
    let quadruplets = [];

    for (let i = 0; i < arr.length - 3; i++) {
        if (i > 0 && arr[i] === arr[i - 1]) continue;
        for (let j = i + 1; j < arr.length - 2; j++) {
            if (j > i + 1 && arr[j] === arr[j - 1]) continue;
            left = j + 1;
            right = arr.length - 1;
            while (left < right) {
                let sum = arr[i] + arr[j] + arr[left] + arr[right];
                if (sum === target) {
                    quadruplets.push([arr[i], arr[j], arr[left], arr[right]]);
                    while (left < right && arr[left] === arr[left + 1]) left++;
                    while (left < right && arr[right] === arr[right - 1]) right--;
                    left++;
                    right--;
                }
                else if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
    }
    return quadruplets;
};

console.log(fourSum([1,0,-1,0,-2,2], 0)); // [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
console.log(fourSum([2,2,2,2,2], 8)); // [[2,2,2,2]]




