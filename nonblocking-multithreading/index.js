const app = require('express')();
const {Worker} = require('worker_threads');

app.get('/isPrime/:number', (req, res) => {
    const number = parseInt(req.params.number);
    const worker = new Worker('./isPrims.js', { workerData: { number } });
    worker.once('message', (result) => {
        res.json(result);
    })
});

app.listen(9000, () => {
    console.log('Server is listening on port 9000');
});