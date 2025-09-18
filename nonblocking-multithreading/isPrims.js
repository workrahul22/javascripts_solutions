const { parentPort, workerData } = require('worker_threads');
console.log(workerData);
const result = isPrime(workerData.number);
parentPort.postMessage(result);

function isPrime(num) {
    if (num <= 1) return false;
    const startTime = Date.now();
    let endTime = Date.now();
    let isPrime = true;
    for(let i=3;i<num;i++) {
        if(num%i===0) {
            isPrime = false;
            endTime = Date.now();
            break;
        }
    }

    if(isPrime) {
        endTime = Date.now();
    }

    return {"num": num, "isPrime": isPrime, "timeTaken": endTime - startTime};
}
parentPort.close();