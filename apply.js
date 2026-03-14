Object.prototype.myApply = function(myobj, params) {
    if(typeof this !== 'function'){
        throw new TypeError('not a function')
    }
    myobj.tempFunction = this;
    const result = myobj.tempFunction(...params); // 
    delete myobj.tempFunction;
    return result;
};

var person = {
    name: 'John Doe',
    greet: function(age){
        console.log(`Hello, my name is ${this.name} and I am ${age} years old`);
    }
}

var person2 = {
    name: 'Jane Doe2'
}

person.greet.myApply(person2, [30]); // Hello, my name is Jane Doe2 and I am 30 years old
