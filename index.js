const express = require('express');
// const shell = require('shelljs');
const fetch = require('node-fetch');

const app = express()

var messageChannel;

app.get("/check-pending", (req, res) => {

    // fetch('http://www.flatfish.online:49162/check-pending', {method: 'POST', body: 'hasPendingVersion=true'});
    fetch('http://www.flatfish.online:49162/check-pending', {method: 'POST', body: '{"hasPendingVersion":"true"}'});


    // fetch('http://www.flatfish.online:49162/check-pending');
    res.status(200).send("Sent message to discord");
})

app.get("/set-pending", (req, res) => {
    fetch('http://www.flatfish.online:49162/set-pending');
    res.status(200).send("Sent message to discord");
})

app.get("/deploy-pending", (req, res) => {
    fetch('http://www.flatfish.online:49162/deploy-pending');
    res.status(200).send("Sent message to discord");
})

app.get("/confirm-pending", (req, res) => {
    fetch('http://www.flatfish.online:49162/confirm-pending');
    res.status(200).send("Sent message to discord");
})

app.get("/", (req, res) => {
    fetch('http://www.flatfish.online:49162/');
    res.status(200).send("Sent message to discord");
})

app.listen(8000, () => {
	console.log('Listening on port 8000!');
});


require('dotenv').config();