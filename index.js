require('dotenv').config();
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const exec = require('child_process').exec;

const app = express();

var messageChannel;

require('dotenv').config();

app.use(bodyParser());

app.listen(8000, () => {
	console.log('Listening on port 8000!');
});


// Stubs for all of the functions that will actually do stuff and then return a status
// Currently just returning a negative status
// You would always hope that the actual responses would be the other way around - at least in the ideal case


// Checks specified environment for pending version
// Possibly just hit the url - is it up? Is it a 500 error?
// If request fails, there is nothing there
// Return whether or not there is something there - true - there is
function checkPendingVersion(environment) {
    console.log("Check pending for " + environment);
    return true;
}

// This will list all of the branches that are candidates for the specified environment
// Only branches up to date with master can be deployment candidates
// Any branch can be tested
function getListOfBranches(environment) {
    console.log("list for " + environment);
    // exec('git branch -a', (err, stdout, stderr) => console.log("output:" + stdout.split(' ')));
    exec('git branch -a', (err, stdout, stderr) => {
        return stdout.split(' ');
    });
    
    // return ['master', 'develop'];
}

// This will do everything to setup the deployment candidate environment
// Checkout correct project
// Pull the latest code for the project
// Create the new image
// New up the docker container
// Return true or false depending on whether it succeeded
function isInDeployedEnvironment(branch) {
    console.log("Has deployed " + branch + "successfully");
    return false;
}

// This will do everything to setup the test candidate environment
// Checkout correct project
// Pull the latest code for the project
// Create the new image
// New up the docker container
// Return true or false depending on whether it succeeded
function isInTestEnvironment(branch) {
    console.log("Has tested " + branch + "successfully");
    return false;
}

// This will tear down the deployment candidate container
// Need to stop current deployment container
// Need to remove the docker container completely
// Need to stop existing live container
// Need to remove current live container - it restarts
// Use the image from deployment to for the live container
// Return whether or not this was done successfully as a Boolean
function deployToLive(project, branch) {
    console.log("Deployed " + branch + " for " + project);
    return false;
}

// Environment specified must be torn down
// Stop the container
// Remove the container
// Return whether or not this was done successfully as Boolean
function rejectCandidate(environment) {
    console.log("Rejected " + environment + "environment");
    return false;
}

// This endpoint is hit when user asks for a list
// Depending on the list depends on what is posted back
app.post("/list", (req, res) => {
    let env = req.body.environment;

    // Some test data
    let allowedList = getListOfBranches(env);

    console.log("allowed: " + allowedList);

    request.post(
        'http://www.flatfish.online:49162/list',
        { json: { environment: env, list: allowedList, token: process.env.CONFIRM_TOKEN} },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
        }
    );
})

// User requests an environment
// Performs the check
// This posts back the envvironment checked and the status of that environment
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

// This calls the function to create a deployment candidate for the specified branch
// Status of deployment sent back
// TO-DO: Take the project name to deploy
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

// This creates a test candidate for the specified branch
// Status of test is sent back
// TO-DO: Take the project name to test
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

// This calls function to set the current deployment candidate to live
// User specifies what branch and of which project in their message
// Posts the status, project and the branch back to user
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

// User can reject either environment
// Specify in their message
// Calls function to take that environment down
// Posts back the status for the bot to deal with
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