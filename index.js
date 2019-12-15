const express = require('express');
// const shell = require('shelljs');
const fetch = require('node-fetch');

const app = express()

var messageChannel;

app.get("/check-pending", (req, res) => {
    fetch('http://www.flatfish.online:49162/check-pending');
})

app.get("/set-pending", (req, res) => {
    fetch('http://www.flatfish.online:49162/set-pending');
})

app.get("/deploy-pending", (req, res) => {
    fetch('http://www.flatfish.online:49162/deploy-pending');
})

app.get("/confirm-pending", (req, res) => {
    fetch('http://www.flatfish.online:49162/confirm-pending');
})

app.get("/", (req, res) => {
    fetch('http://www.flatfish.online:49162/');
})

app.listen(8000, () => {
	console.log('Listening on port 8000!');
});


require('dotenv').config();