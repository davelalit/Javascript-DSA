// Maximum Subarray (Kadane’s Algorithm)
// At each step, decide whether to extend the current subarray or start fresh. Track the maximum seen.
// Kadane’s DP
function maxSubArray(nums) {
    let maxSum = nums[0], currSum = nums[0];
    for (let i = 1; i < nums.length; i++) {
        currSum = Math.max(nums[i], currSum + nums[i]);
        maxSum = Math.max(maxSum, currSum);
    }
    return maxSum;
}
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // 6

// Jump Game
// Greedy approach: track the furthest index reachable. If current index exceeds it, fail.
// Greedy reachability
function canJump(nums) {
    let maxReach = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i > maxReach) return false;
        maxReach = Math.max(maxReach, i + nums[i]);
    }
    return true;
}
console.log(canJump([2,3,1,1,4])); // true
console.log(canJump([3,2,1,0,4])); // false

// Jump Game II
// Greedy BFS-like approach: expand the current “layer” until you must jump. Count jumps.
// Greedy BFS layers
function jump(nums) {
    let jumps = 0, currEnd = 0, currFarthest = 0;
    for (let i = 0; i < nums.length - 1; i++) {
        currFarthest = Math.max(currFarthest, i + nums[i]);
        if (i === currEnd) {
            jumps++;
            currEnd = currFarthest;
        }
    }
    return jumps;
}
console.log(jump([2,3,1,1,4])); // 2
console.log(jump([2,3,0,1,4])); // 2

// Gas Station
// If total gas < total cost, impossible. Otherwise, reset start whenever tank goes negative.
// Greedy reset
function canCompleteCircuit(gas, cost) {
    let total = 0, tank = 0, start = 0;
    for (let i = 0; i < gas.length; i++) {
        total += gas[i] - cost[i];
        tank += gas[i] - cost[i];
        if (tank < 0) {
            start = i + 1;
            tank = 0;
        }
    }
    return total >= 0 ? start : -1;
}
console.log(canCompleteCircuit([1,2,3,4,5], [3,4,5,1,2])); // 3
console.log(canCompleteCircuit([2,3,4], [3,4,3])); // -1

// Hand of Straights
// Sort cards, greedily form consecutive groups. Use a frequency map to track usage.
// Sorting + hashmap
function isNStraightHand(hand, groupSize) {
    if (hand.length % groupSize !== 0) return false;
    hand.sort((a, b) => a - b);
    let count = new Map();

    for (let card of hand) count.set(card, (count.get(card) || 0) + 1);

    for (let card of hand) {
        if (count.get(card) > 0) {
            for (let i = 0; i < groupSize; i++) {
                let curr = card + i;
                if (!count.get(curr)) return false;
                count.set(curr, count.get(curr) - 1);
            }
        }
    }
    return true;
}
console.log(isNStraightHand([1,2,3,6,2,3,4,7,8], 3)); // true
console.log(isNStraightHand([1,2,3,4], 3)); // false

// Merge Triplets to Form Target Triplet
// Only consider triplets that don’t exceed target. Mark if they match each target component. Success if all matched.
// Component-wise check
function mergeTriplets(triplets, target) {
    let good = [false, false, false];
    for (let [a, b, c] of triplets) {
        if (a <= target[0] && b <= target[1] && c <= target[2]) {
            if (a === target[0]) good[0] = true;
            if (b === target[1]) good[1] = true;
            if (c === target[2]) good[2] = true;
        }
    }
    return good.every(Boolean);
}
console.log(mergeTriplets([[2,5,3],[1,8,4],[1,7,5]], [2,7,5])); // true
console.log(mergeTriplets([[1,3,4],[2,5,8]], [2,5,8])); // false

// Partition Labels
// Track last occurrence of each char. Extend partition until all chars inside are closed. Cut and record size.
// Greedy partition by last index
function partitionLabels(s) {
    let last = {};
    for (let i = 0; i < s.length; i++) last[s[i]] = i;

    let res = [], start = 0, end = 0;
    for (let i = 0; i < s.length; i++) {
        end = Math.max(end, last[s[i]]);
        if (i === end) {
            res.push(end - start + 1);
            start = i + 1;
        }
    }
    return res;
}
console.log(partitionLabels("ababcbacadefegdehijhklij")); // [9,7,8]


// Valid Parenthesis String
// Greedy range tracking. leftMin = minimum possible open count, leftMax = maximum possible. Adjust with "*". Valid if range never invalid and ends with 0 possible opens.
// Greedy range tracking
function checkValidString(s) {
    let leftMin = 0, leftMax = 0;
    for (let char of s) {
        if (char === "(") {
            leftMin++;
            leftMax++;
        } else if (char === ")") {
            leftMin--;
            leftMax--;
        } else { // "*"
            leftMin--;
            leftMax++;
        }
        if (leftMax < 0) return false;
        if (leftMin < 0) leftMin = 0;
    }
    return leftMin === 0;
}
console.log(checkValidString("()")); // true
console.log(checkValidString("(*)")); // true
console.log(checkValidString("(*))")); // true
