// Rotate Image (in-place matrix rotation)
var rotate = function(matrix) {
    const n = matrix.length;
    // transpose
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }
    // reverse each row
    for (let row of matrix) {
        row.reverse();
    }
};
// const matrix = [[1,2,3],[4,5,6],[7,8,9]];
// rotate(matrix);
// console.log(matrix); // [[7,4,1],[8,5,2],[9,6,3]]

// Spiral Matrix
var spiralOrder = function(matrix) {
    const res = [];
    let top = 0, bottom = matrix.length-1;
    let left = 0, right = matrix[0].length-1;
    while (top <= bottom && left <= right) {
        for (let j = left; j <= right; j++) res.push(matrix[top][j]);
        top++;
        for (let i = top; i <= bottom; i++) res.push(matrix[i][right]);
        right--;
        if (top <= bottom) {
            for (let j = right; j >= left; j--) res.push(matrix[bottom][j]);
            bottom--;
        }
        if (left <= right) {
            for (let i = bottom; i >= top; i--) res.push(matrix[i][left]);
            left++;
        }
    }
    return res;
};
// const matrix = [[1,2,3],[4,5,6],[7,8,9]];
// console.log(spiralOrder(matrix)); // [1,2,3,6,9,8,7,4,5]


// Set Matrix Zeroes
var setZeroes = function(matrix) {
    const m = matrix.length, n = matrix[0].length;
    let firstRowZero = false, firstColZero = false;

    for (let i = 0; i < m; i++) if (matrix[i][0] === 0) firstColZero = true;
    for (let j = 0; j < n; j++) if (matrix[0][j] === 0) firstRowZero = true;

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][j] === 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][0] === 0 || matrix[0][j] === 0) {
                matrix[i][j] = 0;
            }
        }
    }

    if (firstRowZero) for (let j = 0; j < n; j++) matrix[0][j] = 0;
    if (firstColZero) for (let i = 0; i < m; i++) matrix[i][0] = 0;
};
// const matrix = [[1,1,1],[1,0,1],[1,1,1]];
// setZeroes(matrix);
// console.log(matrix); // [[1,0,1],[0,0,0],[1,0,1]]


// Happy Number
var isHappy = function(n) {
    const seen = new Set();
    const getNext = (num) => {
        let sum = 0;
        while (num > 0) {
            let d = num % 10;
            sum += d*d;
            num = Math.floor(num/10);
        }
        return sum;
    };
    while (n !== 1 && !seen.has(n)) {
        seen.add(n);
        n = getNext(n);
    }
    return n === 1;
};
// console.log(isHappy(19)); // true


// Plus One
var plusOne = function(digits) {
    for (let i = digits.length-1; i >= 0; i--) {
        if (digits[i] < 9) {
            digits[i]++;
            return digits;
        }
        digits[i] = 0;
    }
    digits.unshift(1);
    return digits;
};
// const digits = [9,9,9];
// console.log(plusOne(digits)); // [1,0,0,0]


// Pow(x, n) (Fast Exponentiation)
var myPow = function(x, n) {
    if (n === 0) return 1;
    if (n < 0) return 1 / myPow(x, -n);
    let half = myPow(x, Math.floor(n/2));
    if (n % 2 === 0) return half * half;
    else return half * half * x;
};
// console.log(myPow(2.00000, 10)); // 1024.00000


// Multiply Strings
var multiply = function(num1, num2) {
    if (num1 === "0" || num2 === "0") return "0";
    const m = num1.length, n = num2.length;
    const res = Array(m+n).fill(0);
    for (let i = m-1; i >= 0; i--) {
        for (let j = n-1; j >= 0; j--) {
            let mul = (num1[i]-'0') * (num2[j]-'0');
            let sum = mul + res[i+j+1];
            res[i+j+1] = sum % 10;
            res[i+j] += Math.floor(sum/10);
        }
    }
    while (res[0] === 0) res.shift();
    return res.join('');
};
// const num1 = "123", num2 = "456";
// console.log(multiply(num1, num2)); // "56088"


// Detect Squares (Design problem)
var DetectSquares = function() {
    this.points = new Map(); // key: "x,y", value: count
    this.rows = new Map();   // key: y, value: Map of x counts
};

DetectSquares.prototype.add = function(point) {
    const [x,y] = point;
    const key = `${x},${y}`;
    this.points.set(key, (this.points.get(key) || 0) + 1);
    if (!this.rows.has(y)) this.rows.set(y, new Map());
    this.rows.get(y).set(x, (this.rows.get(y).get(x) || 0) + 1);
};

DetectSquares.prototype.count = function(point) {
    const [x,y] = point;
    if (!this.rows.has(y)) return 0;
    let res = 0;
    for (let [colX, cnt] of this.rows.get(y)) {
        if (colX === x) continue;
        let d = colX - x;
        for (let newY of [y+d, y-d]) {
            let p1 = `${x},${newY}`;
            let p2 = `${colX},${newY}`;
            if (this.points.has(p1) && this.points.has(p2)) {
                res += cnt * this.points.get(p1) * this.points.get(p2);
            }
        }
    }
    return res;
};
// const detectSquares = new DetectSquares();
// detectSquares.add([3, 10]);
// detectSquares.add([11, 2]);
// detectSquares.add([3, 2]);
// console.log(detectSquares.count([11, 10])); // 1
// console.log(detectSquares.count([14, 8])); // 0
// detectSquares.add([11, 10]);
// console.log(detectSquares.count([11, 10])); // 2