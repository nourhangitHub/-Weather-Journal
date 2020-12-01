var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

// lisent port
const port = 5500;

// Setup empty JS object to act as endpoint for all routes
projectData = {};


// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
 
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server

app.listen(port, ()=>{
    console.log(`server running on http://localhost:${port}`);
});

// Initialize all route with a callback function

// Callback function to complete GET '/all'

/*
*** get all data from http://localhost:5500/all
*/
 
app.get('/all', (req, res) => {
    res.send(projectData).status(200).end();
})

// Post Route

/*
*** post data from http://localhost:5500/add
*/

app.post('/add', (req, res) => {
    projectData = {
        temp: req.body.temp,
        date: req.body.date,
        content: req.body.content
    };
    res.send(projectData).status(200).end();
})