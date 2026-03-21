Object.prototype.myBind = function(myobj, ...params) {
    if (typeof this !== "function") {
      throw new Error(this + " is not a Function");
    }
    const self = this;
  
    return function(...args) {
      return self.apply(myobj, [...params, ...args]);
    };
  };
  
  let object1 = {
    name: "Vivek",
    surname: "moradiya",
    printName: function(age, city) {
      return this.name + " " + this.surname + " " + age + " " + city;
    }
  };
  
  let object2 = {
    name: "Amy",
    surname: "Patel"
  };
  
  let boundFunction = object1.printName.myBind(object2, 22);
  console.log(boundFunction("Morbi"));  // Amy Patel 22 Morbi