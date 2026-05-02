// Valid Parentheses
// Use a stack to track opening brackets. When a closing bracket appears, check if it matches the top of the stack. Time: O(n), Space: O(n).

var isValid = function(s) {
    const stack = [];
    const map = {')':'(', ']':'[', '}':'{'};
    for (let char of s) {
        if (char === '(' || char === '[' || char === '{') {
            stack.push(char);
        } else {
            if (stack.length === 0 || stack.pop() !== map[char]) return false;
        }
    }
    return stack.length === 0;
};
console.log(isValid("()[]{}")); // true

// Min Stack
// Maintain two stacks: one for values, one for minimums. Push to both when new min appears. Time: O(1) per operation
class MinStack {
    constructor() {
        this.stack = [];
        this.minStack = [];
    }
    push(val) {
        this.stack.push(val);
        if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {
            this.minStack.push(val);
        }
    }
    pop() {
        let val = this.stack.pop();
        if (val === this.minStack[this.minStack.length - 1]) {
            this.minStack.pop();
        }
    }
    top() {
        return this.stack[this.stack.length - 1];
    }
    getMin() {
        return this.minStack[this.minStack.length - 1];
    }
}
const minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack.getMin()); // -3
minStack.pop();
console.log(minStack.top()); // 0
console.log(minStack.getMin()); // -2

// Evaluate Reverse Polish Notation
// Use a stack. Push numbers, pop two when operator appears, compute result, push back. Time: O(n).

var evalRPN = function(tokens) {
    const stack = [];
    for (let token of tokens) {
        if (!isNaN(token)) {
            stack.push(Number(token));
        } else {
            let b = stack.pop();
            let a = stack.pop();
            switch(token) {
                case '+': stack.push(a + b); break;
                case '-': stack.push(a - b); break;
                case '*': stack.push(a * b); break;
                case '/': stack.push(Math.trunc(a / b)); break;
            }
        }
    }
    return stack.pop();
};

console.log(evalRPN(["2","1","+","3","*"])); // 9

// Daily Temperatures
// Monotonic stack: store indices of decreasing temperatures. When a warmer day is found, compute difference. Time: O(n).

var dailyTemperatures = function(temperatures) {
    const res = new Array(temperatures.length).fill(0);
    const stack = []; // stores indices
    for (let i = 0; i < temperatures.length; i++) {
        while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            let idx = stack.pop();
            res[idx] = i - idx;
        }
        stack.push(i);
    }
    return res;
};
console.log(dailyTemperatures([73,74,75,71,69,72,76,73])); // [1,1,4,2,1,1,0,0]

// Car Fleet
// Sort cars by starting position. Compute time to reach target. If a car takes longer than the fleet ahead, it forms a new fleet. Time: O(n log n).
var carFleet = function(target, position, speed) {
    const cars = [];
    for (let i = 0; i < position.length; i++) {
        cars.push([position[i], speed[i]]);
    }
    cars.sort((a, b) => b[0] - a[0]); // sort by position descending
    
    let fleets = 0;
    let time = 0;
    for (let [pos, spd] of cars) {
        let curTime = (target - pos) / spd;
        if (curTime > time) {
            fleets++;
            time = curTime;
        }
    }
    return fleets;
};
console.log(carFleet(12, [10,8,0,5,3], [2,4,1,1,3])); // 3


// Largest Rectangle in Histogram
// Use a monotonic stack to store indices of increasing heights. When a smaller height is found, calculate area for popped bars. Time: O(n).

var largestRectangleArea = function(heights) {
    const stack = [];
    let maxArea = 0;
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
};
console.log(largestRectangleArea([2,1,5,6,2,3])); // 10

