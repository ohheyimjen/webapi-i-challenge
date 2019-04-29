// implement your API here
const express = require('express');
const db = require('./data/db.js')

const server = express();

server.use(express.json());

server.listen(4000, () => {
    console.log('Server running on localhost:4000');
})

server.get('/', (req, res) => {
    res.send('Web Api Challenge');
});