/**
 * The debounce function ensures that a function is not called too frequently. 
 * It delays the function execution until after a certain period has elapsed since the last time 
 * it was invoked.
 * 
 * Explanation: The debounce function sets a timeout each time it is called. 
 * If it is called again before the delay period ends, the previous timeout is cleared 
 * and a new one is set. This ensures that the function is only executed once the delay period has 
 * elapsed without another call.
 */
function debounce(fn, delay) {
    let timeoutId;
  
    return function(...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
  
      timeoutId = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    };
  }
  
  const debouncedFunction = debounce(() => {
    console.log('Debounced function called');
  }, 2000);
  
  debouncedFunction();
  debouncedFunction();
  debouncedFunction();