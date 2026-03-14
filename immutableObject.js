
// Javascript Proxy to create an immutable object
function createImmutableObject(target) {
    return new Proxy(target, {
        set: function(obj, prop, value) {
            throw new Error("Cannot modify immutable object");
        },
        deleteProperty: function(obj, prop) {
            throw new Error("Cannot delete property from immutable object");
        }
    });     
}

// Example usage:
const immutableObj = createImmutableObject({ name: "Agoda", location: "Thailand" });
console.log(immutableObj.name); // Output: Agoda


//
class ImmutableNumericProperties {
  // Define private fields for immutability
  #props;

  /**
   * Initializes the class with three numeric properties.
   * @param {number} prop1 
   * @param {number} prop2 
   * @param {number} prop3 
   */
  constructor(prop1, prop2, prop3) {
    if (typeof prop1 !== 'number' || typeof prop2 !== 'number' || typeof prop3 !== 'number') {
      throw new Error('All constructor arguments must be numbers.');
    }

    // Store the actual values internally
    this.#props = { prop1, prop2, prop3 };

    // Use a Proxy to create immutable public accessors
    return new Proxy(this, {
      set: (target, property, value) => { // target is the instance of ImmutableNumericProperties, property is the property being set, value is the new value
        // Prevent modification of the specific numeric properties
        if (['prop1', 'prop2', 'prop3'].includes(property)) {
          console.warn(`Attempted to modify immutable property: ${property}. Operation blocked.`);
          // In strict mode, throwing an error is appropriate:
          // throw new TypeError(`Cannot assign to read only property '${property}'`);
          return true; // Return true to indicate handling the set operation without error in non-strict mode
        }
        // Allow setting other potential properties if needed
        target[property] = value;
        return true;
      },
      get: (target, property) => {
        // Redirect access to the public properties to the internal private fields
        if (['prop1', 'prop2', 'prop3'].includes(property)) {
          return target.#props[property];
        }
        return target[property];
      }
    });
  }

  /**
   * Calculates the sum of the three properties.
   * @returns {number} The sum of prop1, prop2, and prop3.
   */
  sum() {
    // Access internal private fields safely
    return this.#props.prop1 + this.#props.prop2 + this.#props.prop3;
  }
}

// --- Example Usage ---

try {
  const instance = new ImmutableNumericProperties(10, 20, 30);
  console.log(`Property 1: ${instance.prop1}`); // Access works, 
  console.log(`The sum is: ${instance.sum()}`); // Sum method works

  console.log('\nAttempting to change a property value...');
  // This action is blocked by the Proxy's 'set' trap
  instance.prop1 = 500; 

  console.log(`Property 1 after attempted change: ${instance.prop1}`); // Value remains unchanged (10)
  console.log(`The sum is still: ${instance.sum()}`); // Sum remains unchanged (60)

} catch (error) {
  console.error(error.message);
}

