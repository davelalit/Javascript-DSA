/**
 * Linked List In-place Reversal
 * This pattern is used to reverse linked lists in place without using extra space.
 * It involves changing the next pointers of the nodes to reverse the direction of the list.
 * Common problems that can be solved using in-place reversal include:
 * 206. Reverse Linked List
 * 92. Reverse Linked List II
 * 24. Swap Nodes in Pairs 
 */

class Node {
    constructor(value, next=null){
        this.value = value; 
        this.next = next; 
    }
}

class LinkedList {
    constructor(){
        this.head = null; 
    }
    // initialize(value){
    //     const newNode = new Node(value);
    //     this.head = newNode;
    //     this.tail = this.head;
    //     this.length = 1;
    // }
    
    push(value){
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

    pop(){
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

    shift(){
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

    unshift(value){
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

    get(index){
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

    set(index, value){
        const foundNode = this.get(index);
        if(foundNode){
            foundNode.value = value;
            return true;
        }
        return false;
    }

    insert(index, value) {
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

    remove(index) { 
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
        this.length--;
        return removed;
    }

    reverse(){
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

    print(){
        const arr = [];
        let currentNode = this.head;
        while(currentNode){
            arr.push(currentNode.value);
            currentNode = currentNode.next;
        }
        return arr.join(' -> ');
    }
}

/* 206. Reverse Linked List
    * Given the head of a singly linked list, reverse the list, and return the reversed list.
    * 
    * Reference: https://leetcode.com/problems/reverse-linked-list/
    * Youtube: https://www.youtube.com/watch?v=2b4c6d8a9e4
    * Example 1:
    * Input: head = [1,2,3,4,5]
    * Output: [5,4,3,2,1]
    * Example 2:
    * Input: head = [1,2]
    * Output: [2,1]
    */
/* var reverseList = function(head) {
    let prev = null;
    let current = head;
    while (current) {
        let next = current.next; // Store the next node
        current.next = prev; // Reverse the link
        prev = current; // Move prev to current
        current = next; // Move to the next node
    }
    return prev; // New head of the reversed list
};
let list = new LinkedList();
list.push(1).push(2).push(3).push(4).push(5);
console.log(reverseList(list.head)); // Output: 5 -> 4 -> 3 -> 2 -> 1
*/

/* 92. Reverse Linked List II
    * Given the head of a singly linked list and two integers left and right where left <= right,
    * reverse the nodes of the list from position left to position right, and return the reversed list.
    * Reference: https://leetcode.com/problems/reverse-linked-list-ii/
    * Youtube: https://www.youtube.com/watch?v=2b4c6d8a9e4
    * Example 1:
    * Input: head = [1,2,3,4,5], left = 2, right = 4
    * Output: [1,4,3,2,5]
    * Example 2:
    * Input: head = [5], left = 1, right = 1
    * Output: [5]
    */
 /* var reverseBetween = function(head, left, right) {
    if (!head || left === right) return head; // If the list is empty or no reversal needed
    let dummy = new Node(0, head); // Create a dummy node to simplify edge cases
    let prev = dummy;   
    for (let i = 0; i < left - 1; i++) {
        prev = prev.next; // Move prev to the node before the left position
    }
    let current = prev.next; // Start from the left position
    let next = null;
    for (let i = 0; i < right - left + 1; i++) {
        next = current.next; // Store the next node
        current.next = prev.next; // Reverse the link
        prev.next = current; // Connect the previous part
        current = next; // Move to the next node
    }
    head.next = current; // Connect the end of the reversed part to the rest of the list
    return dummy.next; // Return the new head of the list
};
let list = new LinkedList();    
list.push(1).push(2).push(3).push(4).push(5);
console.log(reverseBetween(list.head, 2, 4)); // Output: 1 -> 4 -> 3 -> 2 -> 5
*/

/* 24. Swap Nodes in Pairs
    * Given a linked list, swap every two adjacent nodes and return its head.
    * You may not modify the values in the list's nodes, only nodes themselves may be changed.
    * Reference: https://leetcode.com/problems/swap-nodes-in-pairs/
    * Youtube: https://www.youtube.com/watch?v=2b4c6d8a9e4
    * Example 1:
    * Input: head = [1,2,3,4]
    * Output: [2,1,4,3]
    * Example 2:
    * Input: head = []
    * Output: []
    * Example 3:
    * Input: head = [1] 
    * Output: [1]
    */
var swapPairs = function(head) {
    if (!head || !head.next) return head; // If the list is empty or has only one node
    let dummy = new Node(0, head); // Create a dummy node to simplify edge cases
    let prev = dummy; // Previous node to the pair being swapped    
    while (prev.next && prev.next.next) {
        let first = prev.next; // First node of the pair
        let second = first.next; // Second node of the pair
        first.next = second.next; // Link first node to the next pair
        second.next = first; // Link second node to the first node
        prev.next = second; // Connect previous part to the new head of the swapped pair
        prev = first; // Move prev to the end of the swapped pair
    }   
    return dummy.next; // Return the new head of the list
};
let list = new LinkedList();
list.push(1).push(2).push(3).push(4);
console.log(swapPairs(list.head)); // Output: 2 -> 1 -> 4 -> 3
