// https://www.ambitionbox.com/interviews/standard-chartered-interview-questions/software-developer
/*
Standard Chartered Bank interview preparation:
Topics to prepare for the interview
- Ds, oops, graphs, trees, dyanamic programming, dbms
Time required to prepare for the interview
- 6 months
Interview preparation tips for other job seekers
Tip 1 : Practice coding questions
Tip 2 : Try to research about previous interview questions

3. Technical Questions
What is DOM? 

What are indexes in database. 

What is the difference between stored functions and procedures?
*/
/* 1. Given a paragraph consisting of letters in both lowercase and uppercase, spaces, and punctuation, along with a list of banned words, your task is to find the most frequent word that is not in the list of banned words. The solution will always exist and be unique.

While considering words, treat letters as case-insensitive (e.g., 'AsK' and 'aSK' are the same). Words consist solely of alphabets, separated by spaces or punctuation, and the result should be returned in uppercase.
Example:
Input:
Paragraph = "It's a square SqUare. It's a FLAT flat."
N = 3 
BANNEDWORDS = [ "FLAT", "IT", "S" ]
Output:
SQUARE
*/
// Function to find the most frequent word in a paragraph excluding banned words
// The function processes the paragraph, counts word occurrences, and returns the most frequent word in uppercase.
/* 'use strict';
const mostFrequentWord = (paragraph, bannedWords) => {
    const words = paragraph.toLowerCase().match(/\b[a-z]+\b/g) || [];
    const wordCount = {};
    const bannedSet = new Set(bannedWords.map(word => word.toLowerCase()));

    for (const word of words) {
        if (!bannedSet.has(word)) {
            wordCount[word] = (wordCount[word] || 0) + 1;
        }
    }

    let maxCount = 0;
    let mostFrequent = '';

    for (const [word, count] of Object.entries(wordCount)) {
        if (count > maxCount && word.length > 1) { // Ignore single-letter words
            maxCount = count;
            mostFrequent = word;
        }
    }

    return mostFrequent.toUpperCase();
}

console.log(mostFrequentWord("It's a square SqUare. It's a FLAT flat.", ["FLAT", "IT", "S"])); // Output: SQUARE
*/

/*
2. Ways To Make Coin Change
Given an infinite supply of coins of varying denominations, determine the total number of ways to make change for a specified value using these coins. If it's not possible to make the change, the result should be 0.
Input:
N = 3
D = [1, 2, 3]
V = 4
Output:
4
Explanation:
There are four ways to make change for 4 using the denominations [1, 2, 3]:
1. 1+1+1+1
2. 1+1+2
3. 1+3
4. 2+2
*/
/* function countWaysToMakeChange(coins, value) {
    const dp = Array(value + 1).fill(0);
    dp[0] = 1; // Base case: one way to make change for 0

    for (const coin of coins) {
        for (let j = coin; j <= value; j++) {
            dp[j] += dp[j - coin];
        }
    }

    return dp[value];
}  
// Example usage:
const coins = [1, 2, 5];
const value = 5;
console.log(countWaysToMakeChange(coins, value)); // Output: 4
*/

/* 
3. The Skyline Problem
Compute the skyline of given rectangular buildings in a 2D city, eliminating hidden lines and forming the outer contour of the silhouette when viewed from a distance. Each building is described by its geometric information in the form of an array BUILDINGS[i] = [LEFT_i, RIGHT_i, HEIGHT_i].

Explanation:
LEFT_i: x-coordinate of the left edge of the i-th building.
RIGHT_i: x-coordinate of the right edge of the i-th building.
HEIGHT_i: height of the i-th building.
It is assumed that all buildings are perfect rectangles grounded at height 0.

The skyline must be represented as a list of "key points" sorted by x-coordinate in the format [[x1, y1], [x2, y2], ...]. Each key point marks the left endpoint of a horizontal segment in the skyline, except for the last point, which always has y-coordinate 0 to indicate the skyline's termination.
Example:
Input:
N = 2
BUILDINGS = [[2, 9, 10], [3, 7, 15]]

Output:
[[2, 10], [3, 15], [7, 10], [9, 0]]
*/
/* function getSkyline(buildings) {
    const events = [];
    for (const [left, right, height] of buildings) {
        events.push([left, -height]); // Start of building
        events.push([right, height]); // End of building
    }

    events.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

    const result = [];
    const heights = new Map();
    let prevHeight = 0;

    for (const [x, h] of events) {
        if (h < 0) { // Building starts
            heights.set(-h, (heights.get(-h) || 0) + 1);
        } else { // Building ends
            if (heights.has(h)) {
                heights.set(h, heights.get(h) - 1);
                if (heights.get(h) === 0) {
                    heights.delete(h);
                }
            }
        }

        const currentHeight = heights.size > 0 ? Math.max(...heights.keys()) : 0;
        if (currentHeight !== prevHeight) {
            result.push([x, currentHeight]);
            prevHeight = currentHeight;
        }
    }

    return result;
}
// Example usage:
const buildings = [[2, 9, 10], [3, 7, 15]];
console.log(getSkyline(buildings)); // Output: [[2, 10], [3, 15], [7, 10], [9, 0]]
*/

/*
4. Anagram Pairs Verification Problem
Your task is to determine if two given strings are anagrams of each other. 
Two strings are considered anagrams if you can rearrange the letters of one string to form the other string.
Example:
Input:
str1 = "spar", str2 = "rasp"
Output:
True
*/
 function areAnagrams(str1, str2) {
    if (str1.length !== str2.length) return false;

    const charCount = {};

    for (const char of str1) {
        charCount[char] = (charCount[char] || 0) + 1;
    }

    for (const char of str2) {
        if (!charCount[char]) return false;
        charCount[char]--;
        if (charCount[char] < 0) return false;
    }

    return true;
}