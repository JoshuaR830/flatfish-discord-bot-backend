require('dotenv').config();
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser());


var messageChannel;


// Stubs for all of the functions that will actually do stuff and then return a status
// Currently just returning a negative status
// You would always hope that the actual responses would be the other way around - at least in the ideal case

function checkPendingVersions(environment) {
    return true;
}

function isInDeployedEnvironment(branch) {
    return false;
}

function isInTestEnvironment(branch) {
    return false;
}

function getListOfBranches(environment) {
    return ['master', 'develop'];
}

function deployToLive(project, branch) {
    return false;
}

function rejectCandidate(environment) {
    return false;
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

app.post("/list", (req, res) => {
    let env = req.body.environment;

    // Some test data
    let allowedList = getListOfBranches(env);

    request.post(
        'http://www.flatfish.online:49162/check-pending',
        { json: { environment: env, list: allowedList, token: process.env.CONFIRM_TOKEN} },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
        }
    );
})

app.post("/check", (req, res) => {
    let env = req.body.environment;

    pendingVersion = checkPendingVersion(env);

    request.post(
        'http://www.flatfish.online:49162/check',
        { json: { environment: env, hasPendingVersion: pendingVersion, token: process.env.CONFIRM_TOKEN} },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
        }
    );
})

app.post("/deploy", (req, res) => {
    let branch = req.body.branch;

    let deployEnv = isInDeployedEnvironment(branch);

    request.post(
        'http://www.flatfish.online:49162/deploy',
        { json: { branch: branch, isInDeploy: deployEnv, token: process.env.CONFIRM_TOKEN} },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
        }
    );
})

app.post("/test", (req, res) => {
    let branch = req.body.branch;

    let testEnv = isInTestEnvironment(branch);

    request.post(
        'http://www.flatfish.online:49162/test',
        { json: { branch: branch, isInTest: testEnv, token: process.env.CONFIRM_TOKEN} },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
        }
    );
})

app.post("/confirm-deployable", (req, res) => {
    let branch = req.body.branch;
    let project = req.body.project;
    let isLive = deployToLive(project, branch);
    request.post(
        'http://www.flatfish.online:49162/confirm-deployable',
        { json: { isLive: isLive, branch: branch, project: project, token: process.env.CONFIRM_TOKEN} },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
        }
    );
})

app.post("/reject", (req, res) => {
    let environment = req.body.environment;

    successfullyRejected = rejectCandidate(environment);

    request.post(
        'http://www.flatfish.online:49162/reject',
        { json: { isRejected
            : successfullyRejected, token: process.env.CONFIRM_TOKEN} },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
        }
    );
})

// app.get("/set-pending", (req, res) => {
//     fetch('http://www.flatfish.online:49162/set-pending');
//     res.status(200).send("Sent message to discord");
// })

// app.get("/deploy-pending", (req, res) => {
//     fetch('http://www.flatfish.online:49162/deploy-pending');
//     res.status(200).send("Sent message to discord");
// })

// app.get("/confirm-pending", (req, res) => {
//     fetch('http://www.flatfish.online:49162/confirm-pending');
//     res.status(200).send("Sent message to discord");
// })

// app.get("/", (req, res) => {
//     fetch('http://www.flatfish.online:49162/');
//     res.status(200).send("Sent message to discord");
// })

app.listen(8000, () => {
	console.log('Listening on port 8000!');
});


require('dotenv').config();