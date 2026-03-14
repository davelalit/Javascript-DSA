class Node {
    constructor(value, next=null){
        this.value = value; 
        this.next = next; 
    }
}

//unshift, push, reverse returns the linked list
//pop, shift, get, set, insert, remove returns the node
class LinkedList {
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
            this.tail = newNode;
        }
        this.length++;
        return this;
    }

    pop(){ // O(n)
        if(!this.head){
            return undefined;
        }
        let temp = this.head;
        let pre = this.head;
        while(temp.next){
            pre = temp;
            temp = temp.next;
        }
        this.tail = pre;
        this.tail.next = null;
        this.length--;
        if(this.length === 0){
            this.head = null;
            this.tail = null;
        }
        return temp;
    }

    shift(){ // O(1)
        if(!this.head){
            return undefined;
        }
        const temp = this.head;
        this.head = this.head.next;
        temp.next = null;
        this.length--;
        if(this.length === 0){
            this.tail = null;
        }
        return temp;
    }

    unshift(value){ // O(1)
        const newNode = new Node(value);
        if(!this.head){
            this.head = newNode;
            this.tail = this.head;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
        return this;
    }

    get(index){// O(n)
        if(index < 0 || index >= this.length){
            return undefined;
        }
        let counter = 0;
        let currentNode = this.head;
        while(counter !== index){
            currentNode = currentNode.next;
            counter++;
        }
        return currentNode;
    }

    set(index, value){// O(n)
        const foundNode = this.get(index);
        if(foundNode){
            foundNode.value = value;
            return true;
        }
        return false;
    }

    insert(index, value) {// O(n)
        if(index < 0 || index > this.length){
            return false;
        }
        if(index === this.length){
            return !!this.push(value);
        }
        if(index === 0){
            return !!this.unshift(value);
        }
        const newNode = new Node(value);
        const prev = this.get(index-1);
        const temp = prev.next;
        prev.next = newNode;
        newNode.next = temp;
        this.length++;
        return true;
    }

    remove(index) { // O(n)
        if(index < 0 || index >= this.length){
            return undefined;
        }
        if(index === 0){
            return this.shift();
        }
        if(index === this.length - 1){
            return this.pop();
        }
        const prev = this.get(index-1);
        const removed = prev.next;
        prev.next = removed.next;
        removed.next = null;
        this.length--;
        return removed;
    }

    reverse(){ // O(n)
        let prev = null;
        let next = null;
        let current = this.head;
        this.head = this.tail;
        this.tail = current;
        for(let i=0; i<this.length; i++){
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        return this;
    }
}

let myLinkedList = new LinkedList(10);
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