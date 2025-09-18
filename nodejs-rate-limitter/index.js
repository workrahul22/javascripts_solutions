const app = require('express')();
const requestPerSecond = 2;
const storage = {};

setInterval(() => {
    const keys = Object.keys(storage);
    keys.forEach(key => {
        storage[key] = Math.min(storage[key] + requestPerSecond, requestPerSecond);
    });
}, 1000*60);

function isAllowed(req) {
    const header = req.headers['x-user-info'];
    console.log({header});
    if(!header) return false;
    if(storage[header] === undefined) {
        storage[header] = requestPerSecond - 1;
        return true;
    } else {
        if(storage[header] > 0) {
            storage[header] -= 1;
            return true;
        }
    }
}

app.get('/hello', (req, res) => {
    const isAllowed1 = isAllowed(req);
    if(!isAllowed1) {
        return res.status(429).send('Too Many Requests');
    }
    res.send('Hello World!');
});

app.listen(7001, () => {
    console.log('Server is listening on port 7001');
});