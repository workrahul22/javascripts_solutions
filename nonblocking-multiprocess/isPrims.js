process.on('message', (message) => {
    const results = isPrime(message.number);
    process.send(results);
    process.exit();
});

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