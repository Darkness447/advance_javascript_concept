// remember every thing inside the promise will run asyncronously and this will block main thread

const startTime = performance.now();
function customSetTimeout(callback, time) {
    new Promise((r) => {
        let now = Date.now();
        while (Date.now() < now + time) { }
        callback();
        r();
    });
}

customSetTimeout(() => {
    console.log("hello")
}, 5000)
const endTime = performance.now();
console.log(`Time taken: ${endTime - startTime} milliseconds`);

// simply use the worker thread  if you don't want to block the main thread

// main file
// const { Worker } = require("node:worker_threads");

// function customSetTimeout(callback, tm) {
//     const worker = new Worker("./worker.js", {
//         workerData: { tm },
//     });

//     worker.on("exit", (code) => {
//         if (code === 0) {
//             callback();
//         } else {
//             console.log("error");
//         }
//     });
// }

