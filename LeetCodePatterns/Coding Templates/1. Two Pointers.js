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
// Find two lines that together with the x-axis form a container holding the most water.
//
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

