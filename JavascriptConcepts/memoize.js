/**
 * 
 * The memoize function caches the results of function calls to improve performance for expensive computations.
 * Explanation: The myMemoize function uses a cache object to store the results of function calls. 
 * If the function is called again with the same arguments, the cached result is returned.
 */
function myMemoize(fn) {
    const cache = {};
  
    return function(...args) {
      let argCache = JSON.stringify(args);
  
      if (!cache[argCache]) {
        cache[argCache] = fn.call(this, ...args);
      }
  
      return cache[argCache];
    };
  }
  
  const expensiveFunc = (num1, num2) => {
    let output = 1;
    for (let i = 0; i <= 10000000; i++) {
      output += i;
    }
  
    return num1 + num2 + output;
  }
  
  const memoizeFunc = myMemoize(expensiveFunc);
  
  console.time();
  console.log(memoizeFunc(1, 2));
  console.timeEnd();
  
  console.time();
  console.log(memoizeFunc(1, 2));
  console.timeEnd();