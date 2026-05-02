// Blind 75 Java Solution - https://github.com/mdabarik/blind-75-leetcode-questions/blob/main/01--two-sum.java
// Blind 75 Questions https://takeuforward.org/interviews/blind-75-leetcode-problems-detailed-video-solutions
// 1. 	2Sum Problem
function twoSum(nums, target) {
    const numMap = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (numMap.has(complement)) {
            return [numMap.get(complement), i];
        }
        numMap.set(nums[i], i);
    }
    return null; // No solution found
}
// Explanation:
// The function uses a hash map to store the indices of the numbers as it iterates through the array.
// For each number, it calculates the complement (target - current number) and checks if it exists in the map.
// If found, it returns the indices of the two numbers that add up to the target.
// Example usage:
const nums2 = [2, 7, 11, 15];
const target = 9;
console.log(twoSum(nums2, target)); // Output: [0, 1]


// 2. Best Time to Buy and Sell Stock |(DP-35)
function maxProfitDP(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;
    for (let price of prices) {
        if (price < minPrice) {
            minPrice = price;
        } else if (price - minPrice > maxProfit) {
            maxProfit = price - minPrice;
        }   
    }
    return maxProfit;
}
// Explanation:
// The function iterates through the prices array, keeping track of the minimum price seen so far and calculating the potential profit at each step.
// If the current price minus the minimum price is greater than the maximum profit recorded, it updates the maximum profit.
// Example usage:
const pricesDP = [7, 1, 5, 3, 6, 4];
console.log(maxProfitDP(pricesDP)); // Output: 5

// 3. Contains Duplicate
function containsDuplicate(nums) {
    const numSet = new Set();   
    for (let num of nums) {
        if (numSet.has(num)) {
            return true;
        }   
        numSet.add(num);
    }
    return false;
}
// Explanation:
// The function uses a Set to track the numbers that have been seen while iterating through the array.
// If a number is found that already exists in the Set, it returns true, indicating that there is a duplicate.
// If the loop completes without finding duplicates, it returns false.
// Example usage:
const numsDup = [1, 2, 3, 1];
console.log(containsDuplicate(numsDup)); // Output: true

// 4. Product of Array Except Self
function productExceptSelf(nums) {
    const n = nums.length;
    const output = new Array(n).fill(1);
    let leftProduct = 1;
    for (let i = 0; i < n; i++) { // Calculate left products
        output[i] = leftProduct; // Set the left product for index i
        leftProduct *= nums[i]; // Update left product for next index
    }
    // Output array for values [1, 2, 3, 4] after left pass: [1, 1, 2, 6]
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) { // Calculate right products and final output
        output[i] *= rightProduct;
        rightProduct *= nums[i];
    }
    // Output array for values [1, 2, 3, 4] after right pass: [24, 12, 8, 6]
    return output;
}   
// Explanation:
// The function calculates the product of all elements except self by using two passes through the array.
// The first pass computes the product of all elements to the left of each index, and the second pass computes the product of all elements to the right.
// Example usage:
const numsProd = [1, 2, 3, 4];
console.log(productExceptSelf(numsProd)); // Output: [24, 12, 8, 6]

// 5. Kadane's Algorithm, maximum subarray sum 
function maxSubArray(nums) {
    let maxSoFar = nums[0];
    let maxEndingHere = nums[0];
    for (let i = 1; i < nums.length; i++) {
        maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    return maxSoFar;
}
// Explanation:
// The function uses Kadane's Algorithm to find the maximum sum of a contiguous subarray.
// It iterates through the array, updating the maximum sum that ends at the current index and the overall maximum sum found so far.
// Example usage:
const numsKadane = [-2,1,-3,4,-1,2,1,-5,4];
console.log(maxSubArray(numsKadane)); // Output: 6

// 6. Maximum Product Subarray
function maxProduct(nums) {
    let maxSoFar = nums[0];
    let minSoFar = nums[0];
    let result = nums[0];
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] < 0) {
            [maxSoFar, minSoFar] = [minSoFar, maxSoFar]; // Swap
        }
        maxSoFar = Math.max(nums[i], maxSoFar * nums[i]);
        minSoFar = Math.min(nums[i], minSoFar * nums[i]);
        result = Math.max(result, maxSoFar);
    }
    return result;
}

// Explanation:
// The function finds the maximum product of a contiguous subarray by keeping track of both the maximum and minimum products at each index.
// This is necessary because a negative number can turn a minimum product into a maximum when multiplied.
// Example usage:
const numsMaxProd = [2,3,-2,4];
console.log(maxProduct(numsMaxProd)); // Output: 6

// 7. Find Minimum in Rotated Sorted Array 
// Given a sorted array of distinct elements arr[] of size n that is rotated at some unknown point, the task is to find the minimum element in it. 
function findMin(nums) {
    let left = 0;
    let right = nums.length - 1;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return nums[left];
}
// Explanation:
// The function uses a modified binary search to find the minimum element in a rotated sorted array.
// It compares the middle element with the rightmost element to determine which half of the array contains the minimum.
// Example usage:
const numsRotated = [3,4,5,1,2];
console.log(findMin(numsRotated)); // Output: 1

// 8. Search in Rotated Sorted Array
// Given a sorted and rotated array arr[] of distinct elements, find the index of given key in the array. If the key is not present in the array, return -1.
function search(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) {
            return mid;
        }
        if (nums[left] <= nums[mid]) { // Left half is sorted
            if (target >= nums[left] && target < nums[mid]) { // Target in left half
                right = mid - 1;
            }
            else { // Target in right half
                left = mid + 1;
            }
        }
        else { // Right half is sorted
            if (target > nums[mid] && target <= nums[right]) { // Target in right half
                left = mid + 1; 
            }
            else { // Target in left half
                right = mid - 1;
            }
        }
    }
    return -1; // Target not found
}
// Explanation:
// The function uses a modified binary search to find the target in a rotated sorted array.
// It determines which half of the array is sorted and checks if the target lies within that half, adjusting the search boundaries accordingly.
// Example usage:
const numsSearch = [4,5,6,7,0,1,2];
const target = 0;
console.log(search(numsSearch, target)); // Output: 4

// 9. 3 sum
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
const numsThreeSum = [-1, 0, 1, 2, -1, -4];
console.log(threeSum(numsThreeSum)); // Output: [[-1, -1, 2], [-1, 0, 1]]

function hasTripletSum(arr, target) {
    let n = arr.length;
    arr.sort((a, b) => a - b);
    
    // Fix the first element as arr[i]
    for (let i = 0; i < n - 2; i++) {
        
        // Initialize left and right pointers with 
        // start and end of remaining subarray
        let l = i + 1, r = n - 1;
        
        let requiredSum = target - arr[i];
        while (l < r) {
            if (arr[l] + arr[r] == requiredSum)
                return true;
            if (arr[l] + arr[r] < requiredSum)
                l++;
            else if (arr[l] + arr[r] > requiredSum)
                r--;
        }
    }

    return false;
}

// Driver code
let arr = [1, 4, 45, 6, 10, 8];
let target = 13;
if (hasTripletSum(arr, target))
    console.log("true");
else
    console.log("false");
// Output: true

// 10. Container With Most Water
// Given an array arr[] of non-negative integers, where each element arr[i] represents the height of the vertical lines, find the maximum amount of water that can be contained between any two lines, together with the x-axis.
function maxArea(height) {
    let left = 0;
    let right = height.length - 1;
    let maxArea = 0;
    while (left < right) {
        const width = right - left; // Calculate width
        const currentHeight = Math.min(height[left], height[right]); // Calculate height
        const area = width * currentHeight;
        maxArea = Math.max(maxArea, area);
        if (height[left] < height[right]) { // Move the pointer with the smaller height
            left++;
        } else { // Move the pointer with the smaller height
            right--;
        }
    }
    return maxArea;
}
// Explanation:
// The function uses a two-pointer approach to find the maximum area of water that can be contained.
// It calculates the area formed by the lines at the left and right pointers, updates the maximum area, and moves the pointer corresponding to the shorter line inward.
// Example usage:
const height = [1,8,6,2,5,4,8,3,7];
console.log(maxArea(height)); // Output: 49

// 11. Longest Substring Without Repeating Characters
// Given a string s having lowercase characters, find the length of the longest substring without repeating characters. 
function lengthOfLongestSubstring(s) {
    const charIndexMap = new Map();
    let left = 0;
    let maxLength = 0;
    for (let right = 0; right < s.length; right++) {
        const currentChar = s[right];
        if (charIndexMap.has(currentChar) && charIndexMap.get(currentChar) >= left) { // Check if character is in current window
            left = charIndexMap.get(currentChar) + 1; 
        }
        charIndexMap.set(currentChar, right); // Update the last seen index of the character
        maxLength = Math.max(maxLength, right - left + 1); // Update max length
    }
    return maxLength;
}

// Explanation:
// The function uses a sliding window approach with two pointers (left and right) to track the current substring without repeating characters.
// A map is used to store the last seen index of each character. When a repeating character is found, the left pointer is moved to the right of its last occurrence.
// The maximum length of the substring is updated throughout the iteration.
// Example usage:
const sLongest = "abcabcbb";
console.log(lengthOfLongestSubstring(sLongest)); // Output: 3

// 12. longest repeating character replacement
// Given a string s and an integer k. You can choose any string character in one operation and change it to any other uppercase English character. You can perform this operation at most k times.
// Return the length of the longest substring containing the same letter you can get after performing the above operations.
// Note: s consists of only uppercase English letters.
function characterReplacement(s, k) {
    const charCount = new Map();
    let left = 0;
    let maxCount = 0;
    let maxLength = 0;
    for (let right = 0; right < s.length; right++) {
        const rightChar = s[right];
        charCount.set(rightChar, (charCount.get(rightChar) || 0) + 1);
        maxCount = Math.max(maxCount, charCount.get(rightChar));
        while (right - left + 1 - maxCount > k) { // More than k replacements needed
            const leftChar = s[left];
            charCount.set(leftChar, charCount.get(leftChar) - 1);
            left++;
        }
        maxLength = Math.max(maxLength, right - left + 1);
    }
    return maxLength;
}
// Explanation:
// The function uses a sliding window approach to find the longest substring that can be formed by replacing at most k characters.
// It maintains a count of characters in the current window and tracks the maximum frequency of any single character.
// If the number of characters that need to be replaced exceeds k, the left pointer is moved to shrink the window.
// Example usage:
const sReplace = "AABABBA";
const kReplace = 1;
console.log(characterReplacement(sReplace, kReplace)); // Output: 4

// 13. Minimum Window Substring
// Given two strings s and t, the task is to find the smallest substring in s that contains all characters of t, including duplicates. If no such substring exists, return "".
// If multiple substrings of the same length are found, return the one with the smallest starting index.

// increment the end pointer till we get a window containing all characters of t
// then increment the start pointer to minimize the window size while still containing all characters of t

function minWindow(s, t) {
    if (s.length === 0 || t.length === 0) return "";
    const charCount = new Map();
    for (let char of t) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }
    let left = 0;
    let right = 0;
    let required = charCount.size;
    let formed = 0;
    const windowCounts = new Map(); // To keep track of character counts in the current window
    let minLength = Infinity;
    let minLeft = 0;
    while (right < s.length) { // Expand the window by moving right pointer
        const char = s[right];
        windowCounts.set(char, (windowCounts.get(char) || 0) + 1);
        if (charCount.has(char) && windowCounts.get(char) === charCount.get(char)) {
            formed++;
        }
        while (left <= right && formed === required) { // Contract the window by moving left pointer
            char = s[left];
            if (right - left + 1 < minLength) {
                minLength = right - left + 1;
                minLeft = left;
            }
            windowCounts.set(char, windowCounts.get(char) - 1);
            if (charCount.has(char) && windowCounts.get(char) < charCount.get(char)) {
                formed--;
            }
            left++;
        }
        right++;
    }
    return minLength === Infinity ? "" : s.substring(minLeft, minLeft + minLength);
}

// Explanation:
// The function uses a sliding window approach to find the minimum window substring in s that contains all characters of t.
// It maintains counts of characters in the current window and checks if the window contains all required characters.
// Example usage:
const sMinWindow = "ADOBECODEBANC";
const tMinWindow = "ABC";
console.log(minWindow(sMinWindow, tMinWindow)); // Output: "BANC"

// 14. Check for Anagrams
function areAnagrams(s1, s2) {
    if (s1.length !== s2.length) return false;
    const charCount = new Map();
    for (let char of s1) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }
    for (let char of s2) {
        if (!charCount.has(char)) return false;
        charCount.set(char, charCount.get(char) - 1);
        if (charCount.get(char) < 0) return false;
    }
    return true;
}
// Explanation:
// The function checks if two strings are anagrams by counting the occurrences of each character in the first string and then decrementing the counts based on the second string.
// If all counts return to zero, the strings are anagrams.
// Example usage:
const str1 = "listen";
const str2 = "silent";
console.log(areAnagrams(str1, str2)); // Output: true

// 15. Group Anagrams
// Given an array of words arr[], the task is to groups strings that are anagrams. An anagram is a word or phrase formed by rearranging the letters of another, using all the original letters exactly once.
function groupAnagrams(strs) {
    const anagramMap = new Map();
    for (let str of strs) {
        const sortedStr = str.split('').sort().join('');
        if (!anagramMap.has(sortedStr)) {
            anagramMap.set(sortedStr, []);
        }
        anagramMap.get(sortedStr).push(str);
    }
    return Array.from(anagramMap.values());
}
// Explanation:
// The function groups anagrams by sorting each string and using the sorted string as a key in a map.
// All strings that are anagrams of each other will have the same sorted representation and will be grouped together.
// Example usage:
const strsAnagrams = ["eat", "tea", "tan", "ate", "nat", "bat"];
console.log(groupAnagrams(strsAnagrams)); 
// Output: [["eat","tea","ate"],["tan","nat"],["bat"]]

// 16. Check for balanced paranthesis
// Given a string s containing three types of brackets {}, () and []. Determine whether the Expression are balanced or not.
// An expression is balanced if each opening bracket has a corresponding closing bracket of the same type, the pairs are properly ordered and no bracket closes before its matching opening bracket.
function isBalanced(s) {
    const stack = [];
    const bracketMap = {
        '(': ')',
        '{': '}',
        '[': ']'
    };
    for (let char of s) {
        if (bracketMap[char]) { // If it's an opening bracket
            stack.push(bracketMap[char]);
        } else {
            if (stack.pop() !== char) { // Mismatched or unbalanced
                return false;
            }
        }
    }
    return stack.length === 0;
}


function isBalanced(s) {
  const stack = [];
  const bracketMap = {
    ')': '(',
    ']': '[',
    '}': '{'
  };

  for (let char of s) {
    // If it's an opening bracket, push to stack
    if (char === '(' || char === '[' || char === '{') {
      stack.push(char);
    } 
    // If it's a closing bracket, check the top of the stack
    else if (char === ')' || char === ']' || char === '}') {
      if (stack.length === 0 || stack[stack.length - 1] !== bracketMap[char]) {
        return false; // mismatch or empty stack
      }
      stack.pop(); // matched, remove from stack
    }
  }

  // If stack is empty, all brackets matched
  return stack.length === 0;
}

// Example usage:
console.log(isBalanced("{[()]}"));   // true
console.log(isBalanced("{[(])}"));   // false
console.log(isBalanced("{{[[(())]]}}")); // true
console.log(isBalanced("{[}"));      // false

// Explanation:
// The function checks if the parentheses in the string are balanced using a stack.
// It pushes the expected closing brackets onto the stack when an opening bracket is encountered,
// and pops from the stack when a closing bracket is encountered, checking for mismatches.
// Example usage:
const sBalanced = "{[()]}";
console.log(isBalanced(sBalanced)); // Output: true


// 17. Check Palindrome
function isPalindrome(s) {
    let left = 0;
    let right = s.length - 1;
    while (left < right) {
        while (left < right && !isAlphaNumeric(s[left])) left++;
        while (left < right && !isAlphaNumeric(s[right])) right--;
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }   
        left++;
        right--;
    }   
    return true;
}
function isAlphaNumeric(c) {
    return /^[a-z0-9]$/i.test(c);
}
// Explanation:
// The function checks if a string is a palindrome by using two pointers to compare characters from the beginning and end of the string.
// It skips non-alphanumeric characters and performs case-insensitive comparisons.
// Example usage:
const sPalindrome = "A man, a plan, a canal: Panama";
console.log(isPalindrome(sPalindrome)); // Output: true


// 18. Longest Palindromic Substring[Do it without DP]
// Given a string s, find the longest substring which is a palindrome. If there are multiple answers, then find the first appearing substring.
function longestPalindrome(s) {
    if (s.length === 0) return "";
    let start = 0;
    let end = 0;
    for (let i = 0; i < s.length; i++) {
        const len1 = expandAroundCenter(s, i, i); // Odd length palindromes
        const len2 = expandAroundCenter(s, i, i + 1); // Even length palindromes
        const len = Math.max(len1, len2); // Get the maximum length
        if (len > end - start) {
            start = i - Math.floor((len - 1) / 2); // Update start index
            end = i + Math.floor(len / 2);
        }
    }
    return s.substring(start, end + 1);
}

function expandAroundCenter(s, left, right) { // Expand around center and return length of palindrome
    while (left >= 0 && right < s.length && s[left] === s[right]) {
        left--;
        right++;
    }
    return right - left - 1;
}
// Explanation:
// The function finds the longest palindromic substring by expanding around each character (and between characters for even-length palindromes).
// It keeps track of the start and end indices of the longest palindrome found during the expansion.
// Example usage:
const sLongestPalindrome = "babad";
console.log(longestPalindrome(sLongestPalindrome)); // Output: "bab" or "aba"


// 19. Palindromic Substrings
// Given a string s, find the total number of palindromic substrings of length greater than or equal to 2 present in the string.
// A substring is palindromic if it reads the same forwards and backwards.
function countSubstrings(s) {
    let count = 0;
    for (let i = 0; i < s.length; i++) {
        count += expandAroundCenterCount(s, i, i); // Odd length palindromes
        count += expandAroundCenterCount(s, i, i + 1); // Even length palindromes
    }       
    return count;
}
function expandAroundCenterCount(s, left, right) {
    let count = 0;
    while (left >= 0 && right < s.length && s[left] === s[right]) {
        count++;
        left--;
        right++;
    }
    return count;
}
// Explanation:
// The function counts all palindromic substrings in the input string by expanding around each character (and between characters for even-length palindromes).
// It increments the count each time a palindrome is found during the expansion.
// Example usage:
const sPalindromic = "aaa";
console.log(countSubstrings(sPalindromic)); // Output: 6


// 20. Encode and Decode Strings (Leetcode Premium)
function encode(strs) {
    return strs.map(s => s.length + '#' + s).join('');
}
function decode(s) {
    const result = [];
    let i = 0;
    while (i < s.length) {
        let j = i;
        while (s[j] !== '#') {
            j++;
        }
        const length = parseInt(s.substring(i, j));
        result.push(s.substring(j + 1, j + 1 + length));
        i = j + 1 + length;
    }
    return result;
}
// Explanation:
// The encode function concatenates each string with its length and a delimiter, creating a single encoded string.
// The decode function reads the encoded string, extracts the lengths and corresponding substrings, and reconstructs the original array of strings.
// Example usage:
const strsToEncode = ["hello", "world"];
const encodedStr = encode(strsToEncode);
console.log(encodedStr); // Output: "5#hello5#world"
const decodedStrs = decode(encodedStr);
console.log(decodedStrs); // Output: ["hello", "world"]

