// Hash is Deterministic which means that the same input will always produce the same output.
// Hash is Fast which means that the hash function should be fast to compute.
// Hash is Uniform which means that the hash function should map the input to the hash table uniformly.
// Hash is Secure which means that the hash function should not be reversible.
// Hash is Efficient which means that the hash function should produce unique hash values.
// Hash is Consistent which means that the hash function should produce the same hash value for the same input.
// Hash is Collision-Free which means that the hash function should produce unique hash values.
// Hash is Non-Redundant which means that the hash function should produce unique hash values.
// Hash is Unpredictable which means that the hash function should produce unique hash values.
// Hash is One-Way which means that the hash function should not be reversible.
// Hash is Irreversible which means that the hash function should not be reversible.

// Seperate chaining is a collision resolution technique in which each bucket is independent, and has some sort of list of entries with the same index. 
// The time complexity of this technique is O(1 + α) where α is the load factor.

// Linear probing is a collision resolution technique in which when a collision occurs, the program checks the next slot in the hash table. 
// Open addressing is a general term for this technique.

class HashTable {
    constructor(size = 7){
        this.dataMap = new Array(size);
    }

    _hash(key) {
        let hash = 0;
        for(let i = 0; i < key.length; i++){
            hash = (hash + key.charCodeAt(i) * 23) % this.dataMap.length;
        }
        return hash;
    }

    Set(key, value){ // O(1)
        let index = this._hash(key);
        if(!this.dataMap[index]){
            this.dataMap[index] = [];
        }
        this.dataMap[index].push([key, value]);
        return this.dataMap;
    }

    Get(key){ // O(1)
        let index = this._hash(key);
        if(this.dataMap[index]){
            for(let i = 0; i < this.dataMap[index].length; i++){
                if(this.dataMap[index][i][0] === key){
                    return this.dataMap[index][i][1];
                }
            }
        }
        return undefined;
    }

    Keys(){ // O(n)
        const keysArray = [];
        for(let i = 0; i < this.dataMap.length; i++){
            if(this.dataMap[i]){
                for(let j = 0; j < this.dataMap[i].length; j++){
                    keysArray.push(this.dataMap[i][j][0]);
                }
            }
        }
        return keysArray;
    }
}

let myHashTable = new HashTable();
console.log(myHashTable.Set("grapes", 10000));
console.log(myHashTable.Set("apples", 54));
console.log(myHashTable.Set("oranges", 2));
console.log(myHashTable.Get("grapes"));


function itemsInCommon(arr1, arr2){
    let hashTable = new HashTable();
    let result = [];
    for(let i = 0; i < arr1.length; i++){
        hashTable.Set(arr1[i], true);
    }
    for(let i = 0; i < arr2.length; i++){
        if(hashTable.Get(arr2[i])){
            result.push(arr2[i]);
        }
    }
    return result;
}


function itemsInCommon2(arr1, arr2){
    let obj = {};
    for(let i = 0; i < arr1.length; i++){
        obj[arr1]
    }
    for(let i = 0; i < arr2.length; i++){
        if(obj[arr2[i]]){
            return true;
        }
    }
    return result;
}