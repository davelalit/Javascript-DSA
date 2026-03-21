if (!Array.prototype.includes) {
    Array.prototype.includes = function (searchElement, fromIndex) {
        'use strict';
        // Handle null/undefined, get object, and length
        var o = Object(this);
        var len = o.length >>> 0;
        if (len === 0) return false;

        // Calculate starting index
        var n = fromIndex | 0;
        var k = Math.max(n >= 0 ? n : len + n, 0);

        // Search with SameValueZero (handles NaN)
        while (k < len) {
            if (o[k] === searchElement || (isNaN(o[k]) && isNaN(searchElement))) {
                return true;
            }
            k++;
        }
        return false;
    };
}

const numbers = [1, 2, 3, NaN];
console.log(numbers.includes(2));     // Output: true
console.log(numbers.includes(4));     // Output: false
console.log(numbers.includes(NaN));   // Output: true