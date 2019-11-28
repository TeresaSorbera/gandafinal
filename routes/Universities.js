const express = require('express')
// get access to the Express router in order to attach endpoints to the server
// create a router instance where the conferences routes are configured (below)
const universities = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const expressValidator = require('express-validator')
//const { check } = require('express-validator/check')
const { check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const withAuth = require('../config/middleware');

// load the schema/model from the models directory
const University = require("../models/University")
// const Users = require("../models/Users")
// using the router instance created above
universities.use(cors())

// get all the conferences in order to display them all on the front end
universities.get('/list', withAuth, (req, res) => {
    // retrieve all conferences from the database
    // use data model name (contained in the Conference variable) + find + callback function
    University.find(function(err, universities) {
        if(err) {
            console.log(err);
        }
        // attach the data being retrieved from the db to the response object
        // conferences contains the data
        else {
            res.json(universities);
        }
    });
});

// get one specific conference
universities.get('/:id', (req, res) => {
    // extract the value which is available in the id parameter of the url
    // when accessing parameters from the url, access the params object followed by the name of the parameter
    let id = req.params.id;
    // find the id passed in through the request in the db
    University.findById(id, function(err, university) {
        if(err) {
            console.log(err);
        }
        // attach the data being retrieved from the db to the response object
        // conference contains the data
        else {
            res.json(university);
        }
    });
});

// create a new conference record
universities.post('/create', (req, res) => {
    // retrieve the data of the item being created from the request body
    // create a new conference instance based on the data model
    // fill the new object with the data from the req.body property
    let university = new University(req.body)
    /* save to the db and then execute the callback which indicates
    that the item has been successfully created and return a json object which
    contains the conference property
     */
    university.save()
        .then(university => {
            res.status(200).json({'university': 'university successfully created'})
        })
        .catch(err => {
            res.status(400).send('The new university could not be created')
        })
});

// update existing conference objects in the mongodb db
// include id parameter in order to know which specific object to update
universities.post('/update/:id', (req, res) => {
    // retrieve the item which needs to be updated in the db
    University.findById(req.params.id, function (err, university) {
        // check if the conference can be successfully retrieved from the db
        if (!university) {
            res.status(404).send('item could not be found in the db');
        }
        /* if the conference item can be retrieved from the db,
        update its properties with the new values which are passed in the request
        */
        else {
            university.university_name = req.body.university_name;
            university.university_country = req.body.university_country;

            // save the new values to the db
            university.save()
                .then(university => {
                    res.json('University has been updated');
                })
                .catch(err => {
                    res.status(400).send('Update failed');
                });
        }
    })
});

// delete existing conference objects in the mongodb db
// include id parameter in order to know which specific object to delete
universities.delete('/delete/:id', (req, res) => {
    // retrieve the item which needs to be updated in the db
    University.findByIdAndRemove(req.params.id)
        .then(university => {
            if(!university) {
                return res.status(404).send({
                    message: "University not found with id " + req.params.id
                });
            }
            res.send({message: "University deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "University not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete university with id " + req.params.id
        });
    });
});


module.exports = universities

