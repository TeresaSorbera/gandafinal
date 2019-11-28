const express = require('express')
// get access to the Express router in order to attach endpoints to the server
// create a router instance where the conferences routes are configured (below)
const conferences = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const expressValidator = require('express-validator')
//const { check } = require('express-validator/check')
const { check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const withAuth = require('../config/middleware');

// function isLoggedIn(req, res, next) {
//     if (req.session.email === 'tsorbera@ottawa.ca'){
//         next();
//     }
//     else {
//         console.log('You are not authorized');
//     }
//
// }

// load the schema/model from the models directory
const Conference = require("../models/Conference")
// using the router instance created above
conferences.use(cors())

// get all the conferences in order to display them all on the front end
conferences.get('/list', (req, res) => {
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;
console.log(req);
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

// get one specific conference
conferences.get('/:id', (req, res) => {
    // extract the value which is available in the id parameter of the url
    // when accessing parameters from the url, access the params object followed by the name of the parameter
    let id = req.params.id;
    // find the id passed in through the request in the db
    Conference.findById(id, function(err, conference) {
        if(err) {
            console.log(err);
        }
        // attach the data being retrieved from the db to the response object
        // conference contains the data
        else {
            res.json(conference);
        }
    });
});

// create a new conference record
conferences.post('/create', (req, res) => {
    // retrieve the data of the item being created from the request body
    // create a new conference instance based on the data model
    // fill the new object with the data from the req.body property
    let conference = new Conference(req.body)
    /* save to the db and then execute the callback which indicates
    that the item has been successfully created and return a json object which
    contains the conference property
     */
    conference.save()
              .then(conference => {
                  res.status(200).json({'conference': 'conference successfully created'})
              })
              .catch(err => {
                  res.status(400).send('The new conference could not be created')
              })
});

// update existing conference objects in the mongodb db
// include id parameter in order to know which specific object to update
conferences.post('/update/:id', (req, res) => {
    // retrieve the item which needs to be updated in the db
    Conference.findById(req.params.id, function (err, conference) {
        // check if the conference can be successfully retrieved from the db
        if (!conference) {
            res.status(404).send('item could not be found in the db');
        }
        /* if the conference item can be retrieved from the db,
        update its properties with the new values which are passed in the request
        */
        else {
            conference.conference_name = req.body.conference_name;
            conference.conference_description = req.body.conference_description;
            conference.conference_date = req.body.conference_date;
            conference.conference_university = req.body.conference_university;

            // save the new values to the db
            conference.save()
                .then(conference => {
                    res.json('Conference has been updated');
                })
                .catch(err => {
                    res.status(400).send('Update failed');
                });
        }
    })
});

// delete existing conference objects in the mongodb db
// include id parameter in order to know which specific object to delete
conferences.delete('/delete/:id', (req, res) => {
    // retrieve the item which needs to be updated in the db
    Conference.findByIdAndRemove(req.params.id)
        .then(conference => {
            if(!conference) {
                return res.status(404).send({
                    message: "Conference not found with id " + req.params.id
                });
            }
            res.send({message: "Conference deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Conference not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete conference with id " + req.params.id
        });
    });
});

module.exports = conferences

