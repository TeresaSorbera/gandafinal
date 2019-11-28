const express = require('express')
// get access to the Express router in order to attach endpoints to the server
// create a router instance where the conferences routes are configured (below)
const frontend = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const expressValidator = require('express-validator')
//const { check } = require('express-validator/check')
const { check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// load the schema/model from the models directory
const Conference = require("../models/Conference")
const Mathematician = require("../models/Mathematician")
//let Mathematician = require("../models/Mathematician");
// const Users = require("../models/Users")
// using the router instance created above
frontend.use(cors())

// get all the conferences in order to display them all on the front end
frontend.get('/conferences/list', (req, res) => {
    // retrieve all conferences from the database
    // use data model name (contained in the Conference variable) + find + callback function
    Conference.find(function(err, conferences) {
        if(err) {
            console.log(err);
        }
        // attach the data being retrieved from the db to the response object
        // conferences contains the data
        else {
            res.json(conferences);
        }
    });
});

// get all the members in order to display them all on the front end
frontend.get('/mathematicians/list', (req, res) => {
    // retrieve all conferences from the database
    // use data model name (contained in the Conference variable) + find + callback function
    Mathematician.find(function(err, mathematicians) {
        if(err) {
            console.log(err);
        }
        // attach the data being retrieved from the db to the response object
        // conferences contains the data
        else {
            res.json(mathematicians);
        }
    });
});


module.exports = frontend

