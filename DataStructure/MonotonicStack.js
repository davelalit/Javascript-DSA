class MonotonicStack {
    constructor(increasing = true) {
        this.stack = [];
        this.increasing = increasing;
    }

    push(val) {
        if (this.increasing) { // if increasing, pop until top is smaller or equal
            while (this.stack.length && this.stack[this.stack.length - 1] > val) {
                this.stack.pop();
            }
        } else {
            while (this.stack.length && this.stack[this.stack.length - 1] < val) { // if decreasing, pop until top is larger or equal
                this.stack.pop();
            }
        }
        this.stack.push(val);
    }

    top() {
        return this.stack[this.stack.length - 1];
    }

    pop() {
        return this.stack.pop();
    }

    size() {
        return this.stack.length;
    }
}

// Example usage:
const incStack = new MonotonicStack(true);
incStack.push(3);
incStack.push(1);
incStack.push(2);
console.log(incStack.stack); // [1, 2]

const decStack = new MonotonicStack(false);
decStack.push(1);
decStack.push(3);
decStack.push(2);
console.log(decStack.stack); // [3, 2]


// Next Greater Element I
function nextGreaterElement(nums1, nums2) {
    let stack = [], map = new Map();

    for (let num of nums2) {
        while (stack.length && stack[stack.length - 1] < num) {
            map.set(stack.pop(), num);
        }
        stack.push(num);
    }

    return nums1.map(num => map.get(num) || -1);
}
console.log(nextGreaterElement([4,1,2], [1,3,4,2])); // [-1, 3, -1]
console.log(nextGreaterElement([2,4], [1,2,3,4])); // [3, -1]


// Daily Temperatures
function dailyTemperatures(temps) {
    let res = Array(temps.length).fill(0);
    let stack = []; // store indices

    for (let i = 0; i < temps.length; i++) {
        while (stack.length && temps[i] > temps[stack[stack.length - 1]]) {
            let idx = stack.pop();
            res[idx] = i - idx;
        }
        stack.push(i);
    }
    return res;
}
console.log(dailyTemperatures([73,74,75,71,69,72,76,73])); // [1,1,4,2,1,1,0,0]

// Largest Rectangle in Histogram
function largestRectangleArea(heights) {
    let stack = [], maxArea = 0;
    heights.push(0); // sentinel

    for (let i = 0; i < heights.length; i++) {
        while (stack.length && heights[i] < heights[stack[stack.length - 1]]) {
            let h = heights[stack.pop()];
            let w = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, h * w);
        }
        stack.push(i);
    }
    return maxArea;
}
console.log(largestRectangleArea([2,1,5,6,2,3])); // 10

// Trapping Rain Water
function trap(height) {
    let stack = [], water = 0;

    for (let i = 0; i < height.length; i++) {
        while (stack.length && height[i] > height[stack[stack.length - 1]]) {
            let top = stack.pop();
            if (!stack.length) break; // no left boundary
            let distance = i - stack[stack.length - 1] - 1; // width between current and left boundary
            let boundedHeight = Math.min(height[i], height[stack[stack.length - 1]]) - height[top]; // height[top] is the bottom of the container, min of current and left is the water level
            water += distance * boundedHeight; // area = width * height
        }
        stack.push(i);
    }
    return water;
}
console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1])); // 6