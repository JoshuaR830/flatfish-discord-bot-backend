require('dotenv').config();
const express = require('express');
// const shell = require('shelljs');
const fetch = require('node-fetch');
const request = require('request');

const app = express()

var messageChannel;

app.get("/check-pending", (req, res) => {

    // let payload = {
    //     hasPendingVersion: true,
    //     token: process.env.CONFIRM_TOKEN
    // };

    // console.log(payload);

    // let data = new FormData();
    // data.append("json", JSON.stringify(payload))
    

    // let fetchData = {
    //     method: 'POST',
    //     body: data,
    // };

    // console.log(fetchData);

    // // fetch('http://www.flatfish.online:49162/check-pending', {method: 'POST', body: 'hasPendingVersion=true'});
    // fetch('http://www.flatfish.online:49162/check-pending', fetchData);




    // var request = require('request');

request.post(
    'http://www.flatfish.online:49162/check-pending',
    { json: { hasPendingVersion: true, token: process.env.CONFIRM_TOKEN } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }
);


    // fetch('http://www.flatfish.online:49162/check-pending');
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