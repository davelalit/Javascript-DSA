function* Generator() {
    let i = 0;
    while (i < 5) {
        yield i;
        i++;
    }
}
 
const gen = Generator();
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());

// Generator to create Iterators and managing asynchronus flow


