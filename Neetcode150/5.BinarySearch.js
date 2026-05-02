// Binary Search
// We repeatedly halve the search space. If the middle element matches, return index. Otherwise, adjust left/right pointers depending on whether the target is greater or smaller.
function binarySearch(nums, target) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
console.log(binarySearch([-1,0,3,5,9,12], 9)); // 4
console.log(binarySearch([-1,0,3,5,9,12], 2)); // -1

// Search a 2D Matrix
// Treat the 2D matrix as a flattened sorted array. Use binary search by mapping mid to row/col.

function searchMatrix(matrix, target) {
    let rows = matrix.length, cols = matrix[0].length;
    let left = 0, right = rows * cols - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        let value = matrix[Math.floor(mid / cols)][mid % cols];
        if (value === target) return true;
        else if (value < target) left = mid + 1;
        else right = mid - 1;
    }
    return false;
}
console.log(searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3)); // true
console.log(searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 13)); // false

// Koko Eating Bananas
// Binary search on eating speed. Check if Koko can finish within  hours at a given speed.
function minEatingSpeed(piles, h) {
    let left = 1, right = Math.max(...piles);

    function canEat(speed) {
        let hours = 0;
        for (let pile of piles) {
            hours += Math.ceil(pile / speed);
        }
        return hours <= h;
    }

    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (canEat(mid)) right = mid;
        else left = mid + 1;
    }
    return left;
}
console.log(minEatingSpeed([3,6,7,11], 8)); // 4
console.log(minEatingSpeed([30,11,23,4,20], 5)); // 30

// Find Minimum in Rotated Sorted Array
// Binary search for the pivot point. If mid > right, min lies to the right; otherwise, to the left.
function findMin(nums) {
    let left = 0, right = nums.length - 1;
    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (nums[mid] > nums[right]) left = mid + 1;
        else right = mid;
    }
    return nums[left];
}
console.log(findMin([3,4,5,1,2])); // 1
console.log(findMin([4,5,6,7,0,1,2])); // 0


// Search in Rotated Sorted Array
// Binary search with rotation awareness. Decide which half is sorted and check if target lies within.
function search(nums, target) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) return mid;

        if (nums[left] <= nums[mid]) { // Left half sorted
            if (target >= nums[left] && target < nums[mid]) right = mid - 1;
            else left = mid + 1;
        } else { // Right half sorted
            if (target > nums[mid] && target <= nums[right]) left = mid + 1;
            else right = mid - 1;
        }
    }
    return -1;
}
console.log(search([4,5,6,7,0,1,2], 0)); // 4
console.log(search([4,5,6,7,0,1,2], 3)); // -1


// Time Based Key Value Store
// Store values with timestamps. Use binary search to find the latest value not exceeding the given timestamp.
class TimeMap {
    constructor() {
        this.store = {};
    }

    set(key, value, timestamp) {
        if (!this.store[key]) this.store[key] = [];
        this.store[key].push([timestamp, value]);
    }

    get(key, timestamp) {
        if (!this.store[key]) return "";
        let arr = this.store[key];
        let left = 0, right = arr.length - 1, res = "";
        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            if (arr[mid][0] <= timestamp) {
                res = arr[mid][1];
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return res;
    }
}
const timeMap = new TimeMap();
timeMap.set("foo", "bar", 1);
console.log(timeMap.get("foo", 1)); // "bar"
console.log(timeMap.get("foo", 3)); // "bar"
timeMap.set("foo", "bar2", 4);
console.log(timeMap.get("foo", 4)); // "bar2"
console.log(timeMap.get("foo", 5)); // "bar2"

// Median of Two Sorted Arrays
// Binary search partitioning. Ensure left partitions contain smaller elements than right partitions. Median depends on total length parity.
function findMedianSortedArrays(nums1, nums2) {
    if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);

    let m = nums1.length, n = nums2.length;
    let left = 0, right = m;

    while (left <= right) {
        let partitionX = Math.floor((left + right) / 2);
        let partitionY = Math.floor((m + n + 1) / 2) - partitionX;

        let maxLeftX = partitionX === 0 ? -Infinity : nums1[partitionX - 1];
        let minRightX = partitionX === m ? Infinity : nums1[partitionX];
        let maxLeftY = partitionY === 0 ? -Infinity : nums2[partitionY - 1];
        let minRightY = partitionY === n ? Infinity : nums2[partitionY];

        if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
            if ((m + n) % 2 === 0) {
                return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2;
            } else {
                return Math.max(maxLeftX, maxLeftY);
            }
        } else if (maxLeftX > minRightY) {
            right = partitionX - 1;
        } else {
            left = partitionX + 1;
        }
    }
}
console.log(findMedianSortedArrays([1, 3], [2])); // 2.0
console.log(findMedianSortedArrays([1, 2], [3, 4])); // 2.5