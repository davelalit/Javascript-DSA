class Node {
    constructor(value, next=null, prev=null){
        this.value = value; 
        this.next = next; 
        this.prev = prev;
    }
}

//unshift, push, reverse returns the linked list
//pop, shift, get, set, insert, remove returns the node
class DoublyLinkedList {
    constructor(value){
        const newNode = new Node(value);
        this.head = newNode;
        this.tail = this.head;
        this.length = 1;
    }

    push(value){ // O(1)
        const newNode = new Node(value);
        if(!this.head){
            this.head = newNode;
            this.tail = this.head;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }

    pop(){ // O(1)
        if(!this.head){
            return undefined;
        }
        let temp = this.tail;
        if(this.length === 1){
            this.head = null;
            this.tail = null;
        } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
            temp.prev = null;
        }
        this.length--;
        return temp;
    }

    shift(){ // O(1)
        if(!this.head){
            return undefined;
        }
        let temp = this.head;
        if(this.length === 1){
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
            this.head.prev = null;
            temp.next = null;
        }
        this.length--;
        return temp;
    }

    unshift(value){ // O(1)
        const newNode = new Node(value);
        if(!this.head){
            this.head = newNode;
            this.tail = this.head;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.length++;
        return this;
    }

    get(index){ // O(n)
        if(index < 0 || index >= this.length){
            return undefined;
        }
        if(index <= this.length/2){
            let count = 0;
            let current = this.head;
            while(count !== index){
                current = current.next;
                count++;
            }
            return current;
        } else {
            let count = this.length - 1;
            let current = this.tail;
            while(count !== index){
                current = current.prev;
                count--;
            }
            return current;
        }
    }

    set(index, value){ // O(n)
        const foundNode = this.get(index);
        if(foundNode){
            foundNode.value = value;
            return true;
        }
        return false;
    }

    insert(index, value){ // O(n)  
        if(index < 0 || index > this.length){
            return false;
        }
        if(index === 0){
            return !!this.unshift(value);
        }
        if(index === this.length){
            return !!this.push(value);
        }
        const newNode = new Node(value);
        const beforeNode = this.get(index-1);
        const afterNode = beforeNode.next;
        beforeNode.next = newNode;
        newNode.prev = beforeNode;
        newNode.next = afterNode;
        afterNode.prev = newNode;
        this.length++;
        return true;
    }

    remove(index){ // O(n)
        if(index < 0 || index >= this.length){
            return undefined;
        }
        if(index === 0){
            return this.shift();
        }
        if(index === this.length - 1){
            return this.pop();
        }
        const removedNode = this.get(index);
        const beforeNode = removedNode.prev;
        const afterNode = removedNode.next;
        beforeNode.next = afterNode;
        afterNode.prev = beforeNode;
        removedNode.next = null;
        removedNode.prev = null;
        this.length--;
        return removedNode;
    }

    reverse(){ // O(n)
        let current = this.head;
        let temp = null;
        while(current){
            temp = current.prev;
            current.prev = current.next;
            current.next = temp;
            current = current.prev;
        }
        if(temp){
            this.head = temp.prev;
        }
        return this;
    }
}

// TESTING
// Create a new DoublyLinkedList and perform various operations to test the implementation
// Time comlexity deatils of all operation below
// push - O(1)
// pop - O(1)
// shift - O(1)
// unshift - O(1)
// get - O(n)
// set - O(n)
// insert - O(n)
// remove - O(n)
// reverse - O(n)

let myLinkedList = new DoublyLinkedList(10);
myLinkedList.push(20);
myLinkedList.push(30);
myLinkedList.push(40);
myLinkedList.push(50);
console.log("Pop: ", myLinkedList.pop());
console.log("Shift: ", myLinkedList.shift());
console.log("Unshift: ", myLinkedList.unshift(5));
console.log("Get: ", myLinkedList.get(2));
console.log("Set: ", myLinkedList.set(2, 100));
console.log("Insert: ", myLinkedList.insert(2, 30));
console.log("Remove: ", myLinkedList.remove(2));
console.log("Reverse: ", myLinkedList.reverse());