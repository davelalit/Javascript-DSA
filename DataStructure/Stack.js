class Node {
    constructor(value, next=null){
        this.value = value; 
        this.next = next; 
    }
}

// push returns Stack
// pop returns the node
class Stack {
    constructor(value) {
        const newNode = new Node(value);
        this.top = newNode;
        this.length = 1;
    }

    push(value){ // unshift O(1)
        const newNode = new Node(value);
        if(!this.top){
            this.top = newNode;
        } else {
            newNode.next = this.top;
            this.top = newNode;
        }
        this.length++;
        return this;
    }

    pop(){ // shift O(1)
        if(!this.top){
            return undefined;
        }
        const temp = this.top;
        this.top = this.top.next;
        temp.next = null;
        this.length--;
        return temp;
    }
}

const stack = new Stack(10);
console.log(stack.push(20));
console.log(stack.push(30));
console.log(stack.pop());