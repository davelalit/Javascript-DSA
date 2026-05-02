class MinHeap {
    constructor() {
        this.heap = [];
    }

    parent(i) { return Math.floor((i - 1) / 2); }
    left(i) { return 2 * i + 1; }
    right(i) { return 2 * i + 2; }

    insert(val) {
        this.heap.push(val);
        this.bubbleUp(this.heap.length - 1);
    }

    bubbleUp(i) {
        while (i > 0 && this.heap[i] < this.heap[this.parent(i)]) { // if current is smaller than parent, swap and move up
            [this.heap[i], this.heap[this.parent(i)]] = [this.heap[this.parent(i)], this.heap[i]];
            i = this.parent(i);
        }
    }

    extractMin() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        let root = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapify(0);
        return root;
    }

    heapify(i) { // compare with children, swap with smallest if needed, and continue heapifying downwards
        let smallest = i;
        let left = this.left(i), right = this.right(i);

        if (left < this.heap.length && this.heap[left] < this.heap[smallest]) smallest = left;
        if (right < this.heap.length && this.heap[right] < this.heap[smallest]) smallest = right;

        if (smallest !== i) {
            [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
            this.heapify(smallest);
        }
    }

    peek() { return this.heap[0] || null; }
    size() { return this.heap.length; }
}


class MaxHeap {
    constructor() {
        this.heap = [];
    }

    parent(i) { return Math.floor((i - 1) / 2); }
    left(i) { return 2 * i + 1; }
    right(i) { return 2 * i + 2; }

    insert(val) {
        this.heap.push(val);
        this.bubbleUp(this.heap.length - 1);
    }

    bubbleUp(i) {
        while (i > 0 && this.heap[i] > this.heap[this.parent(i)]) {
            [this.heap[i], this.heap[this.parent(i)]] = [this.heap[this.parent(i)], this.heap[i]];
            i = this.parent(i);
        }
    }

    extractMax() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        let root = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapify(0);
        return root;
    }

    heapify(i) {
        let largest = i;
        let left = this.left(i), right = this.right(i);

        if (left < this.heap.length && this.heap[left] > this.heap[largest]) largest = left;
        if (right < this.heap.length && this.heap[right] > this.heap[largest]) largest = right;

        if (largest !== i) {
            [this.heap[i], this.heap[largest]] = [this.heap[largest], this.heap[i]];
            this.heapify(largest);
        }
    }

    peek() { return this.heap[0] || null; }
    size() { return this.heap.length; }
}


class PriorityQueue { // Custom Comparator
    constructor(comparator = (a, b) => a - b) {
        this.heap = [];
        this.comparator = comparator;
    }

    parent(i) { return Math.floor((i - 1) / 2); }
    left(i) { return 2 * i + 1; }
    right(i) { return 2 * i + 2; }

    insert(val) {
        this.heap.push(val);
        this.bubbleUp(this.heap.length - 1);
    }

    bubbleUp(i) {
        while (i > 0 && this.comparator(this.heap[i], this.heap[this.parent(i)]) < 0) {
            [this.heap[i], this.heap[this.parent(i)]] = [this.heap[this.parent(i)], this.heap[i]];
            i = this.parent(i);
        }
    }

    extract() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        let root = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapify(0);
        return root;
    }

    heapify(i) {
        let best = i;
        let left = this.left(i), right = this.right(i);

        if (left < this.heap.length && this.comparator(this.heap[left], this.heap[best]) < 0) best = left;
        if (right < this.heap.length && this.comparator(this.heap[right], this.heap[best]) < 0) best = right;

        if (best !== i) {
            [this.heap[i], this.heap[best]] = [this.heap[best], this.heap[i]];
            this.heapify(best);
        }
    }

    peek() { return this.heap[0] || null; }
    size() { return this.heap.length; }
}


// MinHeap
let minHeap = new MinHeap();
minHeap.insert(5);
minHeap.insert(3);
minHeap.insert(8);
console.log(minHeap.extractMin()); // 3
console.log(minHeap.peek());       // 5

// MaxHeap
let maxHeap = new MaxHeap();
maxHeap.insert(5);
maxHeap.insert(3);
maxHeap.insert(8);
console.log(maxHeap.extractMax()); // 8
console.log(maxHeap.peek());       // 5

// Priority Queue (custom comparator)
let pq = new PriorityQueue((a, b) => a.priority - b.priority);
pq.insert({task: "A", priority: 2});
pq.insert({task: "B", priority: 1});
pq.insert({task: "C", priority: 3});
console.log(pq.extract()); // {task: "B", priority: 1}