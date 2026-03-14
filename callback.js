
// Callback hell, also known as the "Pyramid of Doom," occurs when multiple nested callbacks make the code difficult to read and maintain. Here's an example to illustrate this:


// Simulate asynchronous operations with setTimeout
function fetchData1(callback) {
    setTimeout(() => {
        console.log("Data 1 fetched");
        callback();
    }, 1000);
}

function fetchData2(callback) {
    setTimeout(() => {
        console.log("Data 2 fetched");
        callback();
    }, 1000);
}

function fetchData3(callback) {
    setTimeout(() => {
        console.log("Data 3 fetched");
        callback();
    }, 1000);
}

// Callback hell example
fetchData1(() => {
    fetchData2(() => {
        fetchData3(() => {
            console.log("All data fetched - callcacks");
        });
    });
});


// Simulate asynchronous operations with Promises
function fetchData1() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Data 1 fetched");
            resolve();
        }, 1000);
    });
}

function fetchData2() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Data 2 fetched");
            resolve();
        }, 1000);
    });
}

function fetchData3() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Data 3 fetched");
            resolve();
        }, 1000);
    });
}

// Using Promises to avoid callback hell
fetchData1()
    .then(fetchData2)
    .then(fetchData3)
    .then(() => {
        console.log("All data fetched - Promises");
    });


    // Using async/await to avoid callback hell
async function fetchAllData() {
    await fetchData1();
    await fetchData2();
    await fetchData3();
    console.log("All data fetched - async");
}

fetchAllData();

async function fun1() {
    return '';
}
fun1().then(this.resolve, this.reject);

// fun2(){} // schedule a microtask
// window.queueMicrotask(fun2);


