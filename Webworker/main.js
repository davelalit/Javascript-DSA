
var worker = new Worker('.\LongTask.js');
worker.onmessage = (event) => {
    alert(event.data);
  };
  
worker.postMessage(100);


