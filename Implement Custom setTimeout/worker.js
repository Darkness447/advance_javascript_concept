const { workerData } = require("node:worker_threads");

let { tm } = workerData;
let now = Date.now();
while (Date.now() < now + tm) { }
process.exit();