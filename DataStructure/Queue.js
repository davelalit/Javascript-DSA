class Node {
    constructor(value, next=null){
        this.value = value; 
        this.next = next; 
    }
}

// enqueue and dequeue returns Queue
class Queue {
    constructor(value){
        const newNode = new Node(value);
        this.first = newNode;
        this.last = newNode;
        this.length = 1;
    }

    enqueue(value){ // push O(1)
        const newNode = new Node(value);
        if(!this.first){
            this.first = newNode;
            this.last = newNode;
        } else {
            this.last.next = newNode;
            this.last = newNode;
        }
        this.length++;
        return this;
    }

    dequeue(){ // shift O(1)
        if(!this.first){
            return undefined;
        }
        if(this.first === this.last){
            this.last = null;
        }
        this.first = this.first.next;
        this.length--;
        return this;
    }
}

const queue = new Queue(10);
console.log(queue.enqueue(20));
console.log(queue.enqueue(30));
console.log(queue.dequeue());