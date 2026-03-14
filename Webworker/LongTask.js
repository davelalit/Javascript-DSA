self.onmessage = (event) => {
    const data = event.data;
    let result = 0;
    for (let i = 0; i < data; i++) {
        result += i;
    }
  self.postMessage('done');
}