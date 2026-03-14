/**
 * The throttle function ensures that a function is called at most once every specified period.
 * 
 * Explanation: The throttle function checks the time elapsed since the last call. 
 * If it is greater than or equal to the limit, the function is executed and the last call time is updated.
 * 
 * Debouncing vs Throttling: Key Differences
 * Execution Frequency: Debouncing postpones the execution until after a period of inactivity, 
 * while throttling limits the execution to a fixed number of times over an interval.
 * Use Cases: 
 * Debouncing is ideal for tasks that don’t need to execute repeatedly in quick succession, 
 * such as API calls based on user input. 
 * Throttling is suited for controlling the execution rate of functions called in response to events 
 * like scrolling or resizing.
 */
function throttle(fn, limit) {
    let lastCall = 0;
  
    return function(...args) {
      const now = Date.now();
  
      if (now - lastCall >= limit) {
        lastCall = now;
        fn.apply(this, args);
      }
    };
  }
  
  const throttledFunction = throttle(() => {
    console.log('Throttled function called');
  }, 2000);
  
  throttledFunction();
  throttledFunction();
  throttledFunction();