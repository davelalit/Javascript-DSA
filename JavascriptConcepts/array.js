// https://vivekmoradiya.medium.com/most-asked-polyfills-in-javascript-interviews-bad3ec868ead
/** Array Map Function */
/* 
Array.prototype.myMap = function(callback, context) {
    let arr = [];
    for (let i = 0; i < this.length; i++) {
      arr.push(callback.call(context, this[i], i, this)); // array.map(function(currentValue, index, arr), thisValue)
    }
    return arr;
  };
  
  let arr = [1, 2, 4, 5, 6, 4];
  let context = {
    multiplier: 7,
    offset: 10
  };
  
  let newArr = arr.myMap(function(value, index, arr) {
    // console.log(value, index, arr);
    return value * this.multiplier + this.offset;
  }, context);
  
  console.log(newArr);  // [17, 24, 38, 45, 52, 38]
  */

 /** Array Filter Function */
 /* 
 Array.prototype.myFilter = function(callback, context) {
  let arr = [];
  for (let i = 0; i < this.length; i++) {
    if (callback.call(context, this[i], i, this)) { // array.filter(function(currentValue, index, arr), thisValue)
      arr.push(this[i]);
    }
  }
  return arr;
};

let arr = [1, 2, 4, 5, 6, 4];
let context = {
  condition: 5
};

let newArr = arr.myFilter(function(value) {
  return value > this.condition;
}, context);

console.log(newArr);  // [6]
*/


/** Array Reducer Function */
/*
Array.prototype.myReduce = function(callback, initialValue) {
  let output = initialValue;
  let startIndex = 0;
  if (output === undefined) {
    output = this[0];
    startIndex++;
  }

  for (let i = startIndex; i < this.length; i++) {
    output = callback(output, this[i], i, this); // array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
  }

  return output;
};

// const friends = [
//   { name: "Anna", books: ["Bible", "Harry Potter"] },
//   { name: "Bob", books: ["War and peace", "Romeo and Juliet"] },
//   { name: "Alice", books: ["The Lord of the Rings", "The Shining"] }
// ];
// const allBooks = friends.myReduce((acc, cur) => [...acc, ...cur.books], []);

// console.log(allBooks);  // ["Bible", "Harry Potter", "War and peace", "Romeo and Juliet", "The Lord of the Rings", "The Shining"]

const numbers = [15.5, 2.3, 1.1, 4.7];
function getSum(total, num) {
    return total + Math.round(num);
}
console.log(numbers.myReduce(getSum, 0)); // 24
*/




/** Array forEach function */

Array.prototype.myForEach = function (callback, context) {
  for (let i = 0; i < this.length; i++) {
    // This is primarily to check if the item
    // exists in the array, 
    if (this.indexOf(this[i]) > -1) {
      callback.call(context, this[i], i, this);
    }
  }
}
  
//   const arrData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  
//   arrData.myForEach((element) => {
//     console.log(element);
//   });
let sum = 10;
let context = {
    sum: 11
  };
const numbers = [65, 44, 12, 4];
numbers.myForEach(myFunction, context);

function myFunction(item) {
  this.sum += item;
//   console.log(this.sum);
}
console.log(context); // 125
