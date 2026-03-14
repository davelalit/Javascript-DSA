 // create heap class
class Heap {
    constructor(comparator = (a, b) => a - b) {
        this.heap = [];
        this.comparator = comparator;
    }   
    insert(val) {
        this.heap.push(val);
        this.bubbleUp();
    }   
    bubbleUp() {
        let idx = this.heap.length - 1;
        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);  
            if (this.comparator(this.heap[parentIdx], this.heap[idx]) > 0) {
                [this.heap[parentIdx], this.heap[idx]] = [this.heap[idx], this.heap[parentIdx]];
                idx = parentIdx;
            }
            else {
                break;
            }   
        }
    }   
    remove() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        return min;
    }
    bubbleDown() {
        let idx = 0;
        const length = this.heap.length;
        while (true) {
            let leftIdx = 2 * idx + 1;
            let rightIdx = 2 * idx + 2;
            let smallest = idx;
            if (leftIdx < length && this.comparator(this.heap[leftIdx], this.heap[smallest]) < 0) {
                smallest = leftIdx;
            }   
            if (rightIdx < length && this.comparator(this.heap[rightIdx], this.heap[smallest]) < 0) {
                smallest = rightIdx;
            }
            if (smallest === idx) break;
            [this.heap[idx], this.heap[smallest]] = [this.heap[smallest], this.heap[idx]];
            idx = smallest;
        }   
    }
    peek() {
        return this.heap[0] || null;
    }
    size() {
        return this.heap.length;
    }
}

let fn = (arr, k) => {
    let heap = new Heap((a, b) => a[0] - b[0]);
    for (const num of arr) {
        heap.insert([CRITERIA, num]);
        if (heap.size() > k) {
            heap.remove();
        }
    }
    return heap.heap.map(pair => pair[1]);
};

function fn(arr, k) {
    let heap = new Heap((a, b) => a[0] - b[0]);
    for (let num of arr) {
        // do some logic to push onto heap according to problem's criteria
        heap.insert([CRITERIA, num]);
        if (heap.size() > k) {
            heap.remove();
        }
    }
    return heap.heap.map(([criteria, num]) => num);
}