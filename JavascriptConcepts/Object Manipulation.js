/*
object manipulation task using JSON
const obj = {
"a_b_c" : 1,
"a_b_d": 2
};

output - a: {b : {c:1, d:2 } }
*/


const obj = {
  "a_b_c": 1,
  "a_b_d": 2
};

function nestObject(input) {
  const result = {};
  for (const key in input) {
    const parts = key.split("_"); // split by underscore
    let current = result;

    // iterate through parts except the last
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) {
        current[parts[i]] = {};
      }
      current = current[parts[i]]; // move to the next level of nesting i.e. current = result[a], then current = result[a][b]
    }

    // assign the value to the last key
    current[parts[parts.length - 1]] = input[key]; // assign value to the last part of the key i.e. c:1, d:2
  }
  return result;
}

console.log(nestObject(obj));