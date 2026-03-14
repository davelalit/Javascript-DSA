
    /*
    Example 1:
    O(n) - Linear Time Complexity - number of operations is going to be propotional to the number of elements in the array
    function logItems(n) {
     for(let i = 0; i < n; i++) {
        console.log(i) 
        }      
    }
    
    logItems(3) // 0, 1, 2

    Example 2:
    Big O - Drop the constants
    function logItems(n) {
        for(let i = 0; i < n; i++) {
            console.log(i) 
        }
 
        for(let j = 0; j < n; j++) {
            console.log(j) 
        }       
    }
    
    logItems(3) // Time Complexity - O(n) + O(n) = O(2n) = O(n)

    Example 3:
    O(n^2) - Quadratic Time Complexity - number of operations is going to be propotional to the square of the number of elements in the array

    function logItems(n) {
     for(let i = 0; i < n; i++) {
         for(let j = 0; j < n; j++) {
             console.log(i, j) 
         }       
        } 
    }
    
    logItems(10) // O(n^2) - 100 operations

    Example 4:
    Drop the non-dominant terms
    O(n^2 + n) = O(n^2) - Time Complexity
    
    function logItems(n) {
     for(let i = 0; i < n; i++) {
         for(let j = 0; j < n; j++) {
             console.log(i, j) 
         }       
     } 
 
     for(let k = 0; k < n; k++) {
         console.log(k)
     }
    }
    
    logItems(10) // O(n^2 + n) = O(n^2) - Time Complexity

    Example 5:
    O(1) - Constant Time Complexity - number of operations is constant (The most efficient time complexity)

    function addItems(n) {
        return n + n + n + n;
    }

    addItems(10) // O(1) - 4 operations

    Example 6:
    O(log n) - Logarithmic Time Complexity - number of operations is reduced by a factor of log(n) with each step
    This is used in sorted arrays or binary search and it is call divide and conquer
    2^3 = 8, 2^4 = 16, 2^5 = 32, 2^6 = 64, 2^7 = 128, 2^8 = 256, 2^9 = 512, 2^10 = 1024
    log2(8) = 3, log2(16) = 4, log2(32) = 5, log2(64) = 6, log2(128) = 7, log2(256) = 8, log2(512) = 9, log2(1024) = 10

    // With a sorted array and a target value
    function binarySearch(values, target){ 

        // Set left and right boundaries 
        let left = 0; 
        let right = values.length - 1; 

        // Iterate until left does not 
        // cross right 
        while(left <= right) {

            // Find middle index
            let mid = Math.floor((left + right) / 2); 

            // Check if target is equal to middle element 
            if(target === values[mid]){
                return mid; 
            }

            // Check if target is lower than mid element 
            if(target < values[mid]){
                right = mid - 1; 
            }

            // Check if target is greater than mid element 
            if(target > values[mid]){
                left = mid + 1; 
            } 
        } 
        // Return position to insert: 
        return left; 
    } 

    Input: values = [1,3,5,6], target = 7. Output: 4
    Input: values = [1,3,5,6], target = 4. Output: 2


    Example 7:
    Different terms for inputs
    O(a + b) - Time Complexity

     function logItems(a, b) {
        for(let i = 0; i < a; i++) { // O(a)
            console.log(i) 
        }
 
        for(let j = 0; j < b; j++) { // O(b)
            console.log(j) 
        }       
    } // O(a + b)

    // O(a * b) - Time Complexity
    function logItems(a, b) {
     for(let i = 0; i < a; i++) {
         for(let j = 0; j < b; j++) {
             console.log(i, j) 
         }       
     } 
    } // O(a * b)

    Reference - https://www.bigocheatsheet.com/

    Data Structures:
    1. Array - O(1) - Accessing an element in an array by index
        push and pop - O(1) - Adding and removing an element from the end of an array as we do not need to reindex anything
        shift and unshift - O(n) - Adding and removing an element from the beginning of an array as we need to reindex everything
        splice - O(n) - Adding and removing an element from the middle of an array as we need to reindex everything
        search by Value - O(n) - Searching for an element in an array by value
        search by Index - O(1) - Searching for an element in an array by index

        So the big thing that you have to look at when you're looking at a data structure is what are you using
        this for if you need to access things by index. Arrays are a great data structure, 
        but if you're going to be adding and removing a lot of items from the beginning, maybe not the best data structure for you.
        And maybe you should look at a different data structure if that is your use case.

    2. Linked List - 
        Singly Linked List - 
          Push - O(1) - Adding an element to the end of a singly linked list
          Pop - O(n) - Removing an element from the end of a singly linked list as we need to traverse the entire list
          shift and unshift - O(1) - Adding and removing an element from the beginning of a singly linked list
          spice - O(n) - Adding and removing an element from the middle of a singly linked list as we need to traverse the entire list
          search by Value - O(n) - Searching for an element in a singly linked list by value
          search by Index - O(n) - Searching for an element in a singly linked list by index

        Doubly Linked List -
    */

        function findSecondLargest(arr) {
            if (arr.length < 2) {
                return null; // Not enough elements
            }
        
            let first = -Infinity, second = -Infinity;
        
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] > first) {
                    second = first;
                    first = arr[i];
                } else if (arr[i] > second && arr[i] !== first) {
                    second = arr[i];
                }
            }
        
            return second;
        }
        
        // Example usage:
        const numbers = [10, 5, 8, 12, 7];
        const secondLargest = findSecondLargest(numbers);
        console.log(secondLargest); 

        function findThirdLargest(arr) {
            if (arr.length < 3) {
                return null; // Not enough elements
            }
        
            let first = -Infinity, second = -Infinity, third = -Infinity;
        
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] > first) {
                    third = second;
                    second = first;
                    first = arr[i];
                } else if (arr[i] > second && arr[i] !== first) {
                    third = second;
                    second = arr[i];
                } else if (arr[i] > third && arr[i] !== first && arr[i] !== second) {
                    third = arr[i];
                }
            }
        
            return third;
        }

        // Example usage:
        const numbers2 = [10, 5, 8, 12, 7];
        const thirdLargest = findThirdLargest(numbers2);
        console.log(thirdLargest); // Output: 8


        // Curring - A technique that allows you to create a function by calling another function with some of the arguments already set
        const add = a => b => a + b;
        console.log(add(5)(4)); // Output: 9
