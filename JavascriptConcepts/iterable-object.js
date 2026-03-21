let myIterable = {
    items: [1, 2, 3],
    [Symbol.iterator]() {
        let index = 0;
        return {
            next: () => {
                if (index < this.items.length) {
                    return { value: this.items[index++], done: false };
                } else {
                    return { value: undefined, done: true };
                }
            }
        };
    }
};
for (let item of myIterable) {
    console.log(item); // 1, 2, 3
}
