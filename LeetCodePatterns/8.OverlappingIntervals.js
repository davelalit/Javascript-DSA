/**
 * Overlapping Intervals Pattern
 * This pattern is used to solve problems that involve merging or processing intervals.
 * It often involves sorting intervals and then merging them based on certain conditions.
 * Common problems that can be solved using the overlapping intervals technique include:
 * 56. Merge Intervals
 * 57. Insert Interval
 * 435. Non-overlapping intervals
 * 252. Meeting Rooms
 * 253. Meeting Rooms II
 * * The pattern is particularly useful when dealing with problems that require checking for overlaps,
 * * merging intervals, or finding the maximum number of non-overlapping intervals. 
 */

/** * 56. Merge Intervals
 * Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.
 * Reference: https://leetcode.com/problems/merge-intervals/    
 * Youtube: https://www.youtube.com/watch?v=2b4c6d8a9e4
 * Example 1:   
 * Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
 * Output: [[1,6],[8,10],[15,18]]
 * Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
 * Example 2:
 * Input: intervals = [[1,4],[4,5]]
 * Output: [[1,5]]
 * Approach:
 * - Sort the intervals based on the start time.
 * - Initialize an empty array to hold the merged intervals.
 * - Iterate through the sorted intervals and check if the current interval overlaps with the last merged interval.
 * - If they overlap, merge them by updating the end time of the last merged interval.  
 * - If they do not overlap, add the current interval to the merged intervals.
 * * Time Complexity: O(n log n) for sorting, O(n) for merging, resulting in O(n log n) overall.
 */
/* function mergeIntervals(intervals) {
    if (intervals.length === 0) return [];

    // Sort intervals by the start time
    intervals.sort((a, b) => a[0] - b[0]);

    let merged = [];
    let currentInterval = intervals[0];

    for (let i = 1; i < intervals.length; i++) {
        const nextInterval = intervals[i];

        // Check if there is an overlap
        if (currentInterval[1] >= nextInterval[0]) {
            // Merge the intervals
            currentInterval[1] = Math.max(currentInterval[1], nextInterval[1]);
        } else {
            // No overlap, push the current interval to merged and update currentInterval
            merged.push(currentInterval);
            currentInterval = nextInterval;
        }
    }

    // Add the last interval
    merged.push(currentInterval);

    return merged;
}
console.log(mergeIntervals([[1, 3], [2, 6], [8, 10], [15, 18]])); // [[1,6],[8,10],[15,18]]
*/

/** 57. Insert Interval
 * You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represents the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval.
 * Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).
 * Return intervals after the insertion.
 * Reference: https://leetcode.com/problems/insert-interval/
 * Youtube: https://www.youtube.com/watch?v=2b4c6d8a9e4
 * Example 1:
 * Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
 * Output: [[1,5],[6,9]]
 * Explanation: After inserting newInterval, intervals become [[1,5],[6,9]] 
 * Example 2:
 * Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
 * Output: [[1,2],[3,10],[12,16]]   
 * Explanation: After inserting newInterval, intervals become [[1,2],[3,10],[12,16]].
 * Approach:
 * - Initialize an empty array to hold the result.
 * - Iterate through the intervals and add them to the result until you find an interval that overlaps with newInterval.
 * - Merge the overlapping intervals by updating the start and end of newInterval.
 * - Continue adding the remaining intervals to the result.
 * - If newInterval does not overlap with any intervals, simply add it to the result.
 * * Time Complexity: O(n) where n is the number of intervals.
 */
/* function insertInterval(intervals, newInterval) {
    let result = [];
    let i = 0;

    // Add all intervals that end before newInterval starts
    while (i < intervals.length && intervals[i][1] < newInterval[0]) {
        result.push(intervals[i]);
        i++;
    }

    // Merge overlapping intervals
    while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    
    // Add the merged interval
    result.push(newInterval);

    // Add remaining intervals
    while (i < intervals.length) {
        result.push(intervals[i]);
        i++;
    }

    return result;
}
console.log(insertInterval([[1, 3], [6, 9]], [2, 5])); // [[1,5],[6,9]]
console.log(insertInterval([[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8])); // [[1,2],[3,10],[12,16]]
*/

/** 435. Non-overlapping Intervals
 * Given an array of intervals intervals where intervals[i] = [starti, endi],
 * return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.
 * You may assume the interval's end point is always greater than its start point.
 * Reference: https://leetcode.com/problems/non-overlapping-intervals/
 * Youtube: https://www.youtube.com/watch?v=2b4c6d8a9e4
 * Example 1:
 * Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
 * Output: 1
 * Explanation: [1,3] can be removed to make the rest of the intervals non-overlapping.
 * Example 2:
 * Input: intervals = [[1,2],[1,2],[1,2]]
 * Output: 2
 * Explanation: You need to remove two [1,2] to make the rest of the intervals non-overlapping.
 * Approach:
 * - Sort the intervals based on their end times.
 * - Initialize a variable to keep track of the end time of the last added interval.    
 * - Iterate through the sorted intervals and check if the current interval overlaps with the last added interval.
 * - If it does not overlap, add the current interval to the result and update the end time.
 * - If it does overlap, increment the count of intervals to remove.
 * * * Time Complexity: O(n log n) for sorting, O(n) for iterating through the intervals, resulting in O(n log n) overall.
 */

/* function eraseOverlapIntervals(intervals) {
    if (intervals.length === 0) return 0;

    // Sort intervals by their end time
    intervals.sort((a, b) => a[1] - b[1]);

    let count = 0;
    let end = intervals[0][1];

    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < end) {
            // Overlapping interval found, increment count
            count++;
        } else {
            // No overlap, update the end time
            end = intervals[i][1];
        }
    }

    return count;
}
console.log(eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]])); // Output: 1
console.log(eraseOverlapIntervals([[1, 2], [1, 2], [1, 2]])); // Output: 2
*/

/* 252. Meeting Rooms
 * Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], determine if a person could attend all meetings.
 * Reference: https://leetcode.com/problems/meeting-rooms/
 * Youtube: https://www.youtube.com/watch?v=2b4c6d8a9e4
 * Example 1:
 * Input: intervals = [[0,30],[5,10],[15,20]]
 * Output: false
 * Explanation: The first meeting [0,30] overlaps with the second meeting [5,10], so a person cannot attend all meetings.
 * Example 2:
 * Input: intervals = [[7,10],[2,4]]
 * Output: true
 * Explanation: The meetings do not overlap, so a person can attend all meetings.
 * Approach:
 * - Sort the intervals based on their start times.
 * - Iterate through the sorted intervals and check if the start time of the current interval is less than the end time of the previous interval.
 * - If it is, return false (indicating that the meetings overlap). 
 * - If no overlaps are found, return true.
 * * Time Complexity: O(n log n) for sorting, O(n) for iterating through the intervals, resulting in O(n log n) overall.
 */
/* function canAttendMeetings(intervals) {
    if (intervals.length === 0) return true;

    // Sort intervals by their start time
    intervals.sort((a, b) => a[0] - b[0]);

    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < intervals[i - 1][1]) {
            // Overlapping meeting found
            return false;
        }
    }

    return true;    
}
console.log(canAttendMeetings([[0, 30], [5, 10], [15, 20]])); // Output: false
console.log(canAttendMeetings([[7, 10], [2, 4]])); // Output: true
*/

/** 253. Meeting Rooms II
 * Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], return the minimum number of conference rooms required.
 * Reference: https://leetcode.com/problems/meeting-rooms-ii/
 * Youtube: https://www.youtube.com/watch?v=2b4c6d8a9e4
 * Example 1:   
 * Input: intervals = [[0,30],[5,10],[15,20]]
 * Output: 2
 * Explanation: The first meeting [0,30] overlaps with the second meeting [5,10], so two rooms are needed.
 * Example 2:
 *  Input: intervals = [[7,10],[2,4]]
 * Output: 1
 * Explanation: The meetings do not overlap, so only one room is needed.
 * Approach:    
 * - Sort the intervals based on their start times.
 * - Use a min-heap to keep track of the end times of the meetings currently in progress.
 * - Iterate through the sorted intervals and for each interval:    
 * - If the start time of the current interval is greater than or equal to the end time of the meeting at the top of the heap, it means that meeting has ended, and we can reuse that room (remove it from the heap).
 * - Add the end time of the current interval to the heap.
 * - The size of the heap at any point will give the number of rooms required at that time.
 * * Time Complexity: O(n log n) for sorting, O(n log k) for maintaining the heap, where k is the number of rooms, resulting in O(n log n) overall.
 */
class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(val) {
        this.heap.push(val);
        this.bubbleUp();
    }

    removeMin() {
        if (this.heap.length === 0) return null;
        const min = this.heap[0];
        const last = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.bubbleDown();
        }
        return min;
    }

    peek() {
        return this.heap[0];
    }

    size() {
        return this.heap.length;
    }

    // This method ensures the heap property is maintained after insertion
    // by moving the newly added element up the heap until it is in the correct position.
    // It compares the newly added element with its parent and swaps them if the new element is smaller.
    // This process continues until the new element is in the correct position or it becomes the root
    bubbleUp() { 
        let index = this.heap.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index] >= this.heap[parentIndex]) break;
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }

    // This method ensures the heap property is maintained after removal
    // by moving the root element down the heap until it is in the correct position.
    // It compares the root with its children and swaps it with the smaller child if necessary.
    // This process continues until the root is in the correct position or it has no children.
    // It ensures that the smallest element is always at the root of the heap.
    bubbleDown() {
        let index = 0;
        const length = this.heap.length;
        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let smallestIndex = index;

            if (leftChildIndex < length && this.heap[leftChildIndex] < this.heap[smallestIndex]) {
                smallestIndex = leftChildIndex;
            }
            if (rightChildIndex < length && this.heap[rightChildIndex] < this.heap[smallestIndex]) {
                smallestIndex = rightChildIndex;
            }
            if (smallestIndex === index) break;

            [this.heap[index], this.heap[smallestIndex]] = [this.heap[smallestIndex], this.heap[index]];
            index = smallestIndex;
        }
    }
}

 function minMeetingRooms(intervals) {
    if (intervals.length === 0) return 0;

    // Sort the intervals by start time
    intervals.sort((a, b) => a[0] - b[0]);

    let minHeap = new MinHeap();
    minHeap.insert(intervals[0][1]); // Add the end time of the first meeting

    for (let i = 1; i < intervals.length; i++) {
        // If the current meeting starts after the earliest ending meeting, reuse that room
        if (intervals[i][0] >= minHeap.peek()) {
            minHeap.removeMin();
        }
        // Add the end time of the current meeting to the heap
        minHeap.insert(intervals[i][1]);
    }

    return minHeap.size(); // The size of the heap is the number of rooms required
}

console.log(minMeetingRooms([[0, 30], [5, 10], [15, 20]])); // Output: 2
console.log(minMeetingRooms([[7, 10], [2, 4]])); // Output: 1

