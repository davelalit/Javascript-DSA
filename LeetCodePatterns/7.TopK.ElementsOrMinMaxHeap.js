/**
 * Top K Elements Pattern
 * This pattern is used to solve problems that involve finding the top K elements in an array or stream.
 * It often involves using heaps (min-heap or max-heap) to efficiently retrieve the top K elements.
 * It can also be used to find the K smallest or largest elements in a collection. It also used to find K most frequent elements.
 * The pattern is particularly useful when dealing with large datasets where sorting the entire dataset would be inefficient
 * or unnecessary.
 * 
 * Common problems that can be solved using the top K elements technique include:
 * 215. Kth Largest element in an array
 * 347. Top K Frequent Elements
 * 373. Find K Pairs with Smallest Sums
 */

/** 215. Kth Largest element in an array
 * Given an integer array nums and an integer k, return the kth largest element in the array.
 * Note that it is the kth largest element in the sorted order, not the kth distinct element.
 * You must solve it in O(n) time complexity.   
 * Reference: https://leetcode.com/problems/kth-largest-element-in-an-array/
 * Youtube: https://www.youtube.com/watch?v=2b4c6d8a9e4
 * Example 1:
 * Input: nums = [3,2,1,5,6,4], k = 2
 * Output: 5
 * Example 2:
 * Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
 * Output: 4
 * Approach:    
 * - Use a min-heap to keep track of the top k elements.
 * - Iterate through the array and add elements to the heap.
 * - If the heap size exceeds k, remove the smallest element (the root of the min-heap).
 * - The root of the min-heap will be the kth largest element after processing all elements
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

/* function findKthLargest(nums, k) {
    let minHeap = new MinHeap();
    for (let num of nums) {
        minHeap.insert(num);
        if (minHeap.size() > k) {
            minHeap.removeMin();
        }
    }
    return minHeap.peek(); // The root of the min-heap is the kth largest element
}
console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2)); // Output: 5
console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)); // Output: 4
*/


/* 347. Top K Frequent Elements
    * Given an integer array nums and an integer k, return the k most frequent elements.
    * You may return the answer in any order.
    * Reference: https://leetcode.com/problems/top-k-frequent-elements/
    * Youtube: https://www.youtube.com/watch?v=2b4c6d8a9e4
    * Example 1:
    * Input: nums = [1,1,1,2,2,3], k = 2
    * Output: [1,2]
    * Example 2:
    * Input: nums = [1], k = 1
    * Output: [1]
    * Approach:
    * - Use a frequency map to count occurrences of each element.
    * - Use a min-heap to keep track of the top k elements based on their frequency.
    * - If the heap size exceeds k, remove the smallest element (the root of the min-heap).
    * - The heap will contain the k most frequent elements at the end.
    */
/* function topKFrequent(nums, k) {
    let frequencyMap = new Map();
    for (let num of nums) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }

    let minHeap = new MinHeap();
    for (let [num, freq] of frequencyMap.entries()) {
        minHeap.insert({ num, freq });
        if (minHeap.size() > k) {
            minHeap.removeMin();
        }
    }

    return minHeap.heap.map(item => item.num); // Extract the numbers from the heap
}
console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2)); // Output: [1, 2]
console.log(topKFrequent([1], 1)); // Output: [1]
*/

/** 373. Find K Pairs with Smallest Sums
 * Given two integer arrays nums1 and nums2 and an integer k, return an array of k pairs (u, v) such that u is from nums1 and v is from nums2 and the sum of u + v is the smallest.
 * The returned pairs should be sorted in ascending order by their sum.
 * If there are fewer than k pairs, return all of them.
 * Reference: https://leetcode.com/problems/find-k-pairs-with-smallest-sums/
 * Youtube: https://www.youtube.com/watch?v=2b4c6d8a9e4
 * Example 1:
 * Input: nums1 = [1,7], nums2 = [3,4], k = 3
 * Output: [[1,3],[1,4],[7,3]]
 * Example 2:
 * Input: nums1 = [1,2], nums2 = [3], k = 3
 * Output: [[1,3],[2,3]]
 * Approach:
 * - Use a min-heap to store pairs of elements from nums1 and nums2 along with their sums.
 * - Start with the smallest elements from both arrays and push them into the heap.     
 * - Pop the smallest pair from the heap and add it to the result.
 * - If the heap size exceeds k, remove the largest element (the root of the min-heap).
 * - Continue until k pairs are found or the heap is empty.
 */

function kSmallestPairs(nums1, nums2, k) {
    let minHeap = new MinHeap();
    let result = [];
    
    for (let i = 0; i < Math.min(k, nums1.length); i++) {
        for (let j = 0; j < Math.min(k, nums2.length); j++) {
            minHeap.insert([nums1[i], nums2[j]]);
            if (minHeap.size() > k) {
                minHeap.removeMin();
            }
        }
    }

    while (minHeap.size() > 0) {
        result.push(minHeap.removeMin());
    }

    return result.reverse(); // Reverse to get the pairs in ascending order of their sums   
}
console.log(kSmallestPairs([1, 7], [3, 4], 3)); // Output: [[1, 3], [1, 4], [7, 3]]
console.log(kSmallestPairs([1, 2], [3], 3)); // Output: [[1, 3], [2, 3]]