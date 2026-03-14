/**
 * Fast and Slow Pointers Pattern
 * This pattern is used to solve problems that involve detecting cycles in linked lists or arrays.
 * It involves using two pointers that move at different speeds (one fast and one slow) to determine if a cycle exists.
 * Common problems that can be solved using the fast and slow pointers technique include:
 * 141. Linked List Cycle
 * 142. Linked List Cycle II
 * 202. Happy Number
 * 287. Find the Duplicate Number
 */

/** * 141. Linked List Cycle
 * Given head, the head of a linked list, determine if the linked list has a cycle in it.
 * There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer.
 * Internally, pos is used to denote the index of the node that tail's next pointer is connected to (0-indexed).
 * Note that pos is not passed as a parameter.
 * Return true if there is a cycle in the linked list. Otherwise, return false.
 * Reference: https://leetcode.com/problems/linked-list-cycle/
 * Youtube: https://www.youtube.com/watch?v=2b4c6d8a9e4
 * Example 1:
 * Input: head = [3,2,0,-4], pos = 1
 * Output: true
 * Explanation: There is a cycle in the linked list, where tail connects to the second node.
 * Example 2:
 * Input: head = [1,2], pos = 0
 * Output: true
 * Explanation: There is a cycle in the linked list, where tail connects to the first node.
 * Example 3:
 * Input: head = [1], pos = -1  
 * Output: false
 * Explanation: There is no cycle in the linked list.
 * Approach:
 * - Use two pointers, slow and fast.
 * - Move slow by one step and fast by two steps.
 * - If they meet at some point, there is a cycle.
 * - If fast reaches the end of the list, there is no cycle.
 */
/* var hasCycle = function(head) {
    if (!head || !head.next) return false; // If the list is empty or has only one node, no cycle.

    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next; // Move slow pointer by one step.
        fast = fast.next.next; // Move fast pointer by two steps.

        if (slow === fast) { // If they meet, there is a cycle.
            return true;
        }
    }

    return false; // If fast reaches the end, there is no cycle.
}
let head = {val: 3, next: {val: 2, next: {val: 0, next: {val: -4, next: null}}}};
head.next.next.next = head.next; // Creating a cycle
console.log(hasCycle(head)); // true
console.log(hasCycle({val: 3, next: {val: 2, next: {val: 0, next: {val: -4, next: null}}}})); // false
*/

/** * 142. Linked List Cycle II
 * Given head, the head of a linked list, return the node where the cycle begins.
 * If there is no cycle, return null.
 * There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer.
 * Internally, pos is used to denote the index of the node that tail's next pointer is connected to (0-indexed).
 * Note that pos is not passed as a parameter.
 * Reference: https://leetcode.com/problems/linked-list-cycle-ii/
 * Youtube: https://www.youtube.com/watch?v=2b4c6d8a9e4
 * Example 1:
 * Input: head = [3,2,0,-4], pos = 1
 * Output: 2
 * Explanation: There is a cycle in the linked list, where tail connects to the second node.
 * Example 2:
 * Input: head = [1,2], pos = 0     
 * Output: 1
 * Explanation: There is a cycle in the linked list, where tail connects to the first node
 * Example 3:
 * Input: head = [1], pos = -1
 * Output: null
 * Explanation: There is no cycle in the linked list.   
 * Approach:
 * - Use two pointers, slow and fast.
 * - Move slow by one step and fast by two steps.
 * - If they meet, there is a cycle.
 * - To find the start of the cycle, reset one pointer to the head and move both pointers one step at a time until they meet again.
 */
 /* var detectCycle = function(head) {
    if (!head || !head.next) return null; // If the list is empty or has only one node, no cycle.

    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next; // Move slow pointer by one step.
        fast = fast.next.next; // Move fast pointer by two steps.

        if (slow === fast) { // If they meet, there is a cycle.
            let entry = head; // Reset one pointer to the head.
            while (entry !== slow) { // Move both pointers one step at a time until they meet again.
                entry = entry.next;
                slow = slow.next;
            }
            return entry; // The start of the cycle.
        }
    }

    return null; // If fast reaches the end, there is no cycle.
}
let head = {val: 3, next: {val: 2, next: {val: 0, next: {val: -4, next: null}}}};
head.next.next.next = head.next; // Creating a cycle
console.log(detectCycle(head)); // {val: 2, next: {val: 0, next: {val: -4, next: null}}}
console.log(detectCycle({val: 3, next: {val: 2, next: {val: 0, next: {val: -4, next: null}}}})); // null
*/

/** * 202. Happy Number
 * Write an algorithm to determine if a number n is happy.
 * A happy number is a number defined by the following process:
 * Starting with any positive integer, replace the number by the sum of the squares of its digits.
 * Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle that does not include 1.
 * Those numbers for which this process ends in 1 are happy.    
 * Reference: https://leetcode.com/problems/happy-number/
 * Youtube: https://www.youtube.com/watch?v=2b4c6d8a9e4
 * Example 1:
 * Input: n = 19
 * Output: true
 * Explanation: 1^2 + 9^2 = 82, 8^2 + 2^2 = 68, 6^2 + 8^2 = 100, 1^2 + 0^2 + 0^2 = 1
 * Example 2:
 * Input: n = 2
 * Output: false
 * Explanation: 2^2 = 4, 4^2 = 16, 1^2 + 6^2 = 37, 3^2 + 7^2 = 58, 5^2 + 8^2 = 89, 8^2 + 9^2 = 145, 1^2 + 4^2 + 5^2 = 42, 4^2 + 2^2 = 20, 2^2 + 0^2 = 4 (cycle repeats)
 * Approach:
 * - Use a set to keep track of the numbers we have seen.
 * - If we see a number that we have already seen, it means we are in a cycle and the number is not happy.
 * - If we reach 1, the number is happy.
 * - Use a helper function to calculate the sum of the squares of the digits.
 */

/* var isHappy = function(n) {
    const seen = new Set();

    while (n !== 1 && !seen.has(n)) {
        seen.add(n);
        n = sumOfSquares(n);
    }

    return n === 1;
}
function sumOfSquares(num) {
    let sum = 0;
    while (num > 0) {
        const digit = num % 10;
        sum += digit * digit;
        num = Math.floor(num / 10);
    }
    return sum;
}
let n = 19;
console.log(isHappy(n)); // true
n = 2;
console.log(isHappy(n)); // false
*/

/** 287. Find the Duplicate Number
 * Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.
 * There is only one duplicate number in nums, return this duplicate number.
 * Assume that there is only one duplicate number in the array, and you must not modify the array.
 * You must solve the problem without using extra space and in O(n) time.
 * Reference: https://leetcode.com/problems/find-the-duplicate-number/
 * Youtube: https://www.youtube.com/watch?v=2b4c6d8a9e4
 * Example 1:
 * Input: nums = [1,3,4,2,2]
 * Output: 2
 * Example 2:
 * Input: nums = [3,1,3,4,2]
 * Output: 3
 * Approach:
 * - Use the fast and slow pointers technique.
 * - Treat the array as a linked list where each value points to the next index.
 * - Use two pointers, one moving one step at a time (slow) and the other moving two steps at a time (fast).
 * - If they meet, there is a cycle.
 * - To find the duplicate, reset one pointer to the start and move both pointers one step at a time until they meet again.
 */
 var findDuplicate = function(nums) {
    let slow = nums[0];
    let fast = nums[0];

    // Phase 1: Finding the intersection point
    do {
        slow = nums[slow]; // Move slow pointer by one step
        fast = nums[nums[fast]]; // Move fast pointer by two steps
    } while (slow !== fast);

    // Phase 2: Finding the entrance to the cycle
    let entry = nums[0];
    while (entry !== slow) {
        entry = nums[entry]; // Move entry pointer by one step
        slow = nums[slow]; // Move slow pointer by one step
    }

    return entry; // The duplicate number
}
let nums = [1, 3, 4, 2, 2];
console.log(findDuplicate(nums)); // 2
nums = [3, 1, 3, 4, 2];
console.log(findDuplicate(nums)); // 3




