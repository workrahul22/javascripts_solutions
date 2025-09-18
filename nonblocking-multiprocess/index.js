const app = require('express')();
const { fork } = require('child_process');

app.get('/isPrime/:number', (req, res) => {
    const number = parseInt(req.params.number);
    const compute = fork('./isPrims.js');
    compute.send({ number });
    compute.on('message', (result) => {
        res.json(result);
    })
});

app.listen(9000, () => {
    console.log('Server is listening on port 9000');
});