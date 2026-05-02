// Single Number
// XOR cancels out duplicates (a ^ a = 0). The remaining number is the single one.
// XOR cancellation
function singleNumber(nums) {
    let res = 0;
    for (let num of nums) {
        res ^= num;
    }
    return res;
}
console.log(singleNumber([2,2,1])); // 1
console.log(singleNumber([4,1,2,1,2])); // 4


// Number of 1 Bits
// Check each bit using n & 1. Use unsigned right shift (>>>) to move through bits.
// Bit masking
function hammingWeight(n) {
    let count = 0;
    while (n !== 0) {
        count += n & 1;
        n >>>= 1;
    }
    return count;
}
console.log(hammingWeight(11)); // 3 (1011 in binary)
console.log(hammingWeight(128)); // 1 (10000000 in binary)

// Counting Bits
// Dynamic programming: number of 1s in i = number of 1s in i >> 1 plus last bit.
// DP + bit shift
function countBits(n) {
    let dp = Array(n+1).fill(0);
    for (let i=1; i<=n; i++) {
        dp[i] = dp[i >> 1] + (i & 1);
    }
    return dp;
}
console.log(countBits(5)); // [0,1,1,2,1,2] (0 to 5 in binary: 0, 1, 10, 11, 100, 101)


// Reverse Bits
// Shift result left, add last bit of n. Repeat 32 times. Use >>> 0 to ensure unsigned.
// Bit shifting
function reverseBits(n) {
    let res = 0;
    for (let i=0; i<32; i++) {
        res = (res << 1) | (n & 1);
        n >>>= 1;
    }
    return res >>> 0;
}
console.log(reverseBits(43261596)); // 964176192 (00000010100101000001111010011100 in binary reversed to 00111001011110000010100101000000)
console.log(reverseBits(4294967293)); // 3221225471 (11111111111111111111111111111101 in binary reversed to 10111111111111111111111111111111)


// Missing Number
// XOR trick: XOR all indices and numbers. Missing one cancels out, leaving the missing number.
// XOR trick
function missingNumber(nums) {
    let res = nums.length;
    for (let i=0; i<nums.length; i++) {
        res ^= i ^ nums[i];
    }
    return res;
}
console.log(missingNumber([3,0,1])); // 2
console.log(missingNumber([0,1])); // 2

// Sum of Two Integers
// Use bitwise operations: XOR gives sum without carry, AND + shift gives carry. Repeat until no carry.
// Bitwise addition
function getSum(a, b) {
    while (b !== 0) {
        let carry = (a & b) << 1;
        a = a ^ b;
        b = carry;
    }
    return a;
}
console.log(getSum(1, 2)); // 3
console.log(getSum(-1, 1)); // 0

// Reverse Integer
// Extract digits, build reversed number. Apply sign. Check 32-bit integer overflow
// Digit extraction + overflow chec
function reverse(x) {
    let res = 0;
    let sign = x < 0 ? -1 : 1;
    x = Math.abs(x);

    while (x > 0) {
        res = res * 10 + (x % 10);
        x = Math.floor(x / 10);
    }

    res *= sign;
    if (res < -(2**31) || res > 2**31 - 1) return 0;
    return res;
}
console.log(reverse(123)); // 321
console.log(reverse(-123)); // -321
console.log(reverse(120)); // 21
console.log(reverse(1534236469)); // 0 (overflow)