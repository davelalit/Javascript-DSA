// Reverse Linked List
// Iteratively reverse pointers. prev tracks reversed part, curr moves forward.

function reverseList(head) {
    let prev = null, curr = head;
    while (curr) {
        let next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}
console.log(reverseList({ val: 1, next: { val: 2, next: { val: 3, next: null }}})); // { val: 3, next: { val: 2, next: { val: 1, next: null }}}

// Merge Two Sorted Lists
// Use a dummy node. Compare heads, attach smaller, move forward.
function mergeTwoLists(l1, l2) {
    let dummy = new ListNode(0);
    let tail = dummy;

    while (l1 && l2) {
        if (l1.val < l2.val) {
            tail.next = l1;
            l1 = l1.next;
        } else {
            tail.next = l2;
            l2 = l2.next;
        }
        tail = tail.next;
    }
    tail.next = l1 || l2;
    return dummy.next;
}
console.log(mergeTwoLists({ val: 1, next: { val: 2, next: null }}, { val: 1, next: { val: 3, next: null }})); // { val: 1, next: { val: 1, next: { val: 2, next: { val: 3, next: null }}}}

// Clone Graph
// DFS with hashmap to track visited nodes and their copies.
function cloneGraph(node) {

// Linked List Cycle
// Floyd’s cycle detection. Fast pointer moves twice as fast; if they meet, cycle exists.
function hasCycle(head) {
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) return true;
    }
    return false;
}
console.log(hasCycle({ val: 3, next: { val: 2, next: { val: 0, next: { val: -4, next: null }}}})); // false
console.log(hasCycle({ val: 1, next: { val: 2, next: null }})); // false
console.log(hasCycle({ val: 1, next: { val: 2, next: { val: 3, next: { val: 4, next: null }}}})); // false
console.log(hasCycle({ val: 1, next: { val: 2, next: { val: 3, next: { val: 4, next: null }}}}));   // false
console.log(hasCycle({ val: 1, next: { val: 2, next: { val: 3, next: { val: 4, next: null }}}})); // false
console.log(hasCycle({ val: 1, next: { val: 2, next: { val: 3, next: { val: 4, next: null }}}}));

// Reorder List
// Split list, reverse second half, merge alternately.
function reorderList(head) {
    if (!head) return;

    // Step 1: Find middle
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // Step 2: Reverse second half
    let prev = null, curr = slow.next;
    slow.next = null;
    while (curr) {
        let next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }

    // Step 3: Merge two halves
    let first = head, second = prev;
    while (second) {
        let tmp1 = first.next, tmp2 = second.next;
        first.next = second;
        second.next = tmp1;
        first = tmp1;
        second = tmp2;
    }
}
console.log(reorderList({ val: 1, next: { val: 2, next: { val: 3, next: { val: 4, next: null }}}})); // { val: 1, next: { val: 4, next: { val: 2, next: { val: 3, next: null }}}}
console.log(reorderList({ val: 1, next: { val: 2, next: { val: 3, next: { val: 4, next: { val: 5, next: null }}}}})); // { val: 1, next: { val: 5, next: { val: 2, next: { val: 4, next: { val: 3, next: null }}}}}

// Remove Nth Node From End
// Two-pointer technique. Move first pointer n+1 steps, then move both until end
function removeNthFromEnd(head, n) {
    let dummy = new ListNode(0, head);
    let first = dummy, second = dummy;

    for (let i = 0; i <= n; i++) first = first.next;
    while (first) {
        first = first.next;
        second = second.next;
    }
    second.next = second.next.next;
    return dummy.next;
}
console.log(removeNthFromEnd({ val: 1, next: { val: 2, next: { val: 3, next: { val: 4, next: { val: 5, next: null }}}}}, 2)); // { val: 1, next: { val: 2, next: { val: 3, next: { val: 5, next: null }}}}
console.log(removeNthFromEnd({ val: 1, next: { val: 2, next: null }}, 1)); // { val: 1, next: null }

// Copy List With Random Pointer
// Use a hashmap to store original → copy mapping. Then link next and random.
function copyRandomList(head) {
    if (!head) return null;

    let map = new Map();
    let curr = head;

    // First pass: create copies
    while (curr) {
        map.set(curr, new Node(curr.val));
        curr = curr.next;
    }

    // Second pass: assign next and random
    curr = head;
    while (curr) {
        map.get(curr).next = map.get(curr.next) || null;
        map.get(curr).random = map.get(curr.random) || null;
        curr = curr.next;
    }

    return map.get(head);
}
console.log(copyRandomList({ val: 7, next: { val: 13, next: { val: 11, next: { val: 10, next: { val: 1, next: null }}}}, random: null }, { val: 13, next: { val: 11, next: { val: 10, next: { val: 1, next: null }}}}, random: { val: 7 }}, { val: 11, next: { val: 10, next: { val: 1, next: null }}, random: { val: 1 }}, { val: 10, next: { val: 1, next: null }, random: { val: 11 }}, { val: 1, next: null, random: { val: 7 }})); // Deep copy of the list with correct random pointers

// Add Two Numbers
// Simulate digit-by-digit addition with carry.
function addTwoNumbers(l1, l2) {
    let dummy = new ListNode(0);
    let curr = dummy, carry = 0;

    while (l1 || l2 || carry) {
        let sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + carry;
        carry = Math.floor(sum / 10);
        curr.next = new ListNode(sum % 10);
        curr = curr.next;
        l1 = l1 ? l1.next : null;
        l2 = l2 ? l2.next : null;
    }
    return dummy.next;
}
console.log(addTwoNumbers({ val: 2, next: { val: 4, next: { val: 3, next: null }}}, { val: 5, next: { val: 6, next: { val: 4, next: null }}})); // { val: 7, next: { val: 0, next: { val: 8, next: null }}}

// Find The Duplicate Number
// Treat array as linked list. Use Floyd’s cycle detection to find duplicate
function findDuplicate(nums) {
    let slow = nums[0], fast = nums[0];
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow !== fast);

    slow = nums[0];
    while (slow !== fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    return slow;
}
console.log(findDuplicate([1,3,4,2,2])); // 2
console.log(findDuplicate([3,1,3,4,2])); // 3

// LRU Cache
// Use Map (ordered). On access, move key to end. On insert, evict oldest if full.
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map();
    }

    get(key) {
        if (!this.map.has(key)) return -1;
        let val = this.map.get(key);
        this.map.delete(key);
        this.map.set(key, val);
        return val;
    }

    put(key, value) {
        if (this.map.has(key)) this.map.delete(key);
        else if (this.map.size === this.capacity) {
            this.map.delete(this.map.keys().next().value);
        }
        this.map.set(key, value);
    }
}
const lru = new LRUCache(2);
lru.put(1, 1);
lru.put(2, 2);
console.log(lru.get(1)); // 1
lru.put(3, 3);
console.log(lru.get(2)); // -1
lru.put(4, 4);
console.log(lru.get(3)); // -1
console.log(lru.get(4)); // 4


// Merge K Sorted Lists
// Use min-heap to always pick smallest head among lists.
function mergeKLists(lists) {
    let heap = new MinPriorityQueue({ priority: x => x.val });
    for (let node of lists) if (node) heap.enqueue(node);

    let dummy = new ListNode(0), curr = dummy;
    while (!heap.isEmpty()) {
        let node = heap.dequeue().element;
        curr.next = node;
        curr = curr.next;
        if (node.next) heap.enqueue(node.next);
    }
    return dummy.next;
}
console.log(mergeKLists([{ val: 1, next: { val: 4, next: { val: 5, next: null }}}, { val: 1, next: { val: 3, next: { val: 4, next: null }}}, { val: 2, next: { val: 6, next: null }}})); // Merged sorted list of all nodes


// Reverse Nodes in K Group
// Find kth node, reverse that segment, reconnect. Repeat until no full group remains.
function reverseKGroup(head, k) {
    let dummy = new ListNode(0, head);
    let groupPrev = dummy;

    while (true) {
        let kth = getKth(groupPrev, k);
        if (!kth) break;
        let groupNext = kth.next;

        // reverse group
        let prev = kth.next, curr = groupPrev.next;
        while (curr !== groupNext) {
            let tmp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = tmp;
        }

        let tmp = groupPrev.next;
        groupPrev.next = kth;
        groupPrev = tmp;
    }
    return dummy.next;
}

function getKth(curr, k) {
    while (curr && k > 0) {
        curr = curr.next;
        k--;
    }
    return curr;
}
console.log(reverseKGroup({ val: 1, next: { val: 2, next: { val: 3, next: { val: 4, next: { val: 5, next: null }}}}}, 2)); // { val: 2, next: { val: 1, next: { val: 4, next: { val: 3, next: { val: 5, next: null }}}}}
console.log(reverseKGroup({ val: 1, next: { val: 2, next: { val: 3, next: { val: 4, next: { val: 5, next: null }}}}}, 3)); // { val: 3, next: { val: 2, next: { val: 1, next: { val: 4, next: { val: 5, next: null }}}}}