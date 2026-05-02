// Kth Largest Element in a Stream
// Maintain a min-heap of size k. The smallest element in the heap is the kth largest overall. Time: O(n log k).

class KthLargest {
    constructor(k, nums) {
        this.k = k;
        this.minHeap = [];
        for (let num of nums) this.add(num);
    }
    add(val) {
        this.minHeap.push(val);
        this.minHeap.sort((a, b) => a - b);
        if (this.minHeap.length > this.k) this.minHeap.shift();
        return this.minHeap[0];
    }
}
const kthLargest = new KthLargest(3, [4, 5, 8, 2]);
console.log(kthLargest.add(3)); // 4
console.log(kthLargest.add(5)); // 5
console.log(kthLargest.add(10)); // 5
console.log(kthLargest.add(9)); // 8

// Last Stone Weight
// Sort stones, smash the two heaviest. Push back the difference if non-zero. Time: O(n log n).
var lastStoneWeight = function(stones) {
    while (stones.length > 1) {
        stones.sort((a, b) => b - a);
        let y = stones.shift();
        let x = stones.shift();
        if (y !== x) stones.push(y - x);
    }
    return stones.length ? stones[0] : 0;
};
console.log(lastStoneWeight([2,7,4,1,8,1])); // 1

// K Closest Points to Origin
// Sort points by Euclidean distance from origin, return first k. Time: O(n log n).
var kClosest = function(points, k) {
    points.sort((a, b) => (a[0]**2 + a[1]**2) - (b[0]**2 + b[1]**2));
    return points.slice(0, k);
};
console.log(kClosest([[1,3],[-2,2]], 1)); // [[-2, 2]]


//  Kth Largest Element in an Array
// Sort descending and return the kth element. (Quickselect is more optimal, but sorting is simpler.) Time: O(n log n).
var findKthLargest = function(nums, k) {
    nums.sort((a, b) => b - a);
    return nums[k - 1];
};
console.log(findKthLargest([3,2,1,5,6,4], 2)); // 5


// Task Scheduler
// Use the formula: (maxFreq - 1) * (n + 1) + maxCount. This ensures idle slots are minimized. Time: O(n).
var leastInterval = function(tasks, n) {
    const freq = {};
    for (let task of tasks) freq[task] = (freq[task] || 0) + 1;
    const maxFreq = Math.max(...Object.values(freq));
    let maxCount = Object.values(freq).filter(f => f === maxFreq).length;
    return Math.max(tasks.length, (maxFreq - 1) * (n + 1) + maxCount);
};
console.log(leastInterval(["A","A","A","B","B","B"], 2)); // 8

// Design Twitter
// Maintain tweet lists with timestamps and a follow map. News feed is the 10 most recent tweets from self + followees. Time: O(n log n) for feed retrieval.
class Twitter {
    constructor() {
        this.time = 0;
        this.tweets = new Map(); // user -> list of [time, tweetId]
        this.following = new Map(); // user -> set of followees
    }
    postTweet(userId, tweetId) {
        if (!this.tweets.has(userId)) this.tweets.set(userId, []);
        this.tweets.get(userId).push([this.time++, tweetId]);
    }
    getNewsFeed(userId) {
        let feed = [];
        let users = new Set([userId, ...(this.following.get(userId) || [])]);
        for (let u of users) {
            if (this.tweets.has(u)) feed.push(...this.tweets.get(u));
        }
        feed.sort((a, b) => b[0] - a[0]);
        return feed.slice(0, 10).map(x => x[1]);
    }
    follow(followerId, followeeId) {
        if (!this.following.has(followerId)) this.following.set(followerId, new Set());
        this.following.get(followerId).add(followeeId);
    }
    unfollow(followerId, followeeId) {
        if (this.following.has(followerId)) this.following.get(followerId).delete(followeeId);
    }
}
const twitter = new Twitter();
twitter.postTweet(1, 5);
console.log(twitter.getNewsFeed(1)); // [5]
twitter.follow(1, 2);
twitter.postTweet(2, 6);
console.log(twitter.getNewsFeed(1)); // [6, 5]

// Find Median from Data Stream
// Insert numbers in sorted order, then compute median. (Optimal solution uses two heaps, but this simple version works.) Time: O(n) insertion, O(1) median
class MedianFinder {
    constructor() {
        this.nums = [];
    }
    addNum(num) {
        let i = this.nums.findIndex(x => x > num);
        if (i === -1) this.nums.push(num);
        else this.nums.splice(i, 0, num);
    }
    findMedian() {
        let n = this.nums.length;
        if (n % 2 === 0) return (this.nums[n/2 - 1] + this.nums[n/2]) / 2;
        else return this.nums[Math.floor(n/2)];
    }
}
const medianFinder = new MedianFinder();
medianFinder.addNum(1);
medianFinder.addNum(2);
console.log(medianFinder.findMedian()); // 1.5
medianFinder.addNum(3);
console.log(medianFinder.findMedian()); // 2