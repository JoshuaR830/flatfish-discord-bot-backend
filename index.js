require('dotenv').config();
const express = require('express');
const request = require('request');

const app = express()

var messageChannel;

function checkPendingVersions() {
    return true;
}

app.get("/check-pending", (req, res) => {

    var isPending = checkPendingVersions();
    request.post(
        'http://www.flatfish.online:49162/check-pending',
        { json: { hasPendingVersion: isPending, token: process.env.CONFIRM_TOKEN } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
        }
    );
    res.status(200).send("Post request: sent message to discord");
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