// Heap - Binary Heap, each node has a value that is greater than or equal to its children
// Heap can have duplicates unlike BST
// Max heap - parent node is greater than its children
// Min heap - parent node is less than its children

            //        99
            //       /  \
            //      55   40
            //     / \   / \
            //    33 11 30  20  
//   leftChildIndex = 2 * parentIndex 
//   rightChildIndex = 2 * parentIndex + 1

class Heap {
    constructor(){
        this.values = [];
    }

    insert(value){
        this.values.push(value);
        this.bubbleUp();
        return this;
    }

    /**
     * This function ensures that the heap property is maintained after a new element is added to the heap. 
     * It moves the newly added element up the heap until it is in the correct position.
     */
    bubbleUp() {
        let index = this.values.length - 1; // Start with the last element
        const value = this.values[index]; // Get the value of the last element
        while(index > 0) {
            let parentIndex = Math.floor((index - 1) / 2); // Calculate the parent's index
            let parentValue = this.values[parentIndex]; // Get the parent's value
            if(value <= parentValue) break; // If the value is less than or equal to the parent's value, stop
            this.values[parentIndex] = value; // Swap the parent and child
            this.values[index] = parentValue;
            index = parentIndex; // Move up to the parent's index
        }
    } 

    /**
     * 
     * @returns This function removes and returns the maximum element from the heap (the root). 
     * It then reorders the heap to maintain the heap property.
     */
    extractMax() {
        const max = this.values[0]; // The root is the maximum value
        const end = this.values.pop(); // Remove the last element
        if(this.values.length > 0) {
            this.values[0] = end; // Move the last element to the root
            this.bubbleDown(); // Restore the heap property by bubbling down
        }
        return max; // Return the maximum value
    }

    /**
     * This function ensures that the heap property is maintained after the root element is removed. 
     * It moves the new root element down the heap until it is in the correct position.
     */
    bubbleDown() {
        let index = 0; // Start with the root element
        const length = this.values.length; // Get the length of the heap
        const value = this.values[0]; // Get the value of the root element
        while(true) {
            let leftChildIndex = 2 * index + 1; // Calculate the left child's index
            let rightChildIndex = 2 * index + 2; // Calculate the right child's index
            let leftChild, rightChild;
            let swap = null;
    
            if(leftChildIndex < length) {
                leftChild = this.values[leftChildIndex]; // Get the left child's value
                if(leftChild > value) {
                    swap = leftChildIndex; // If the left child is greater, prepare to swap
                }
            }
    
            if(rightChildIndex < length) {
                rightChild = this.values[rightChildIndex]; // Get the right child's value
                if((swap === null && rightChild > value) || (swap !== null && rightChild > leftChild)) {
                    swap = rightChildIndex; // If the right child is greater, prepare to swap
                }
            }
    
            if(swap === null) break; // If no swap is needed, stop
            this.values[index] = this.values[swap]; // Swap the current element with the larger child
            this.values[swap] = value;
            index = swap; // Move down to the child's index
        }
    }
}

exports.Heap = Heap;

let heap = new Heap();
console.log(heap.insert(55));
console.log(heap.insert(40));
console.log(heap.insert(30));
console.log(heap.insert(56));
console.log(heap.insert(45));
console.log(heap.extractMax()); // 56
