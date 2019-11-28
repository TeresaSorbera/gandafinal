const express = require('express')
const mathematicians = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
//const bcryptjs = require('bcryptjs')
const passport = require('passport')
const expressValidator = require('express-validator')
//const { check } = require('express-validator/check')
const { check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const withAuth = require('../config/middleware');

// load the schema from the models directory
const Mathematician = require("../models/Mathematician")
mathematicians.use(cors())

// secret string to use when signing the tokens
// '/secret' route should only be accessible if the requesting client has a valid token
//process.env.SECRET_KEY = 'mysecretsshhh';
const secret = 'mysecretsshhh';

mathematicians.get('/list', (req, res) => {
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

// get one specific conference
mathematicians.get('/:id', (req, res) => {
    // extract the value which is available in the id parameter of the url
    // when accessing parameters from the url, access the params object followed by the name of the parameter
    let id = req.params.id;
    // find the id passed in through the request in the db
    Mathematician.findById(id, function(err, mathematician) {
        if(err) {
            console.log(err);
        }
        // attach the data being retrieved from the db to the response object
        // conference contains the data
        else {
            res.json(mathematician);
        }
    });
});

// route where new members can register
mathematicians.post('/register', [
    check('first_name').isLength({ min: 3 }).trim().escape(),
    check('last_name').isLength({ min: 2 }).trim().escape(),
    check('university').isLength({ min: 2 }).trim().escape(),
    check('email').isEmail().normalizeEmail(),
    check('password').isLength({ min: 6 })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const today = new Date()
    // req.body.{name} is the information coming through the browser in the request object
    // save this data to the memberData object - represents the document to be inserted into Mongo
    const mathematicianData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        university: req.body.university,
        email: req.body.email,
        password: req.body.password,
        created: today
    }

    Mathematician.findOne({
        email: req.body.email
    })
        .then(mathematician => {
            if(!mathematician) {
                //console.log(mathematician);
                //console.log("asdfghj");
                bcrypt.genSalt (10, function(err, salt) {
                    bcrypt.hash(mathematicianData.password, salt, function(err, hash) {
                        mathematicianData.password = hash;
                        Mathematician.create(mathematicianData)
                            .then(mathematician => {
                                res.json({status: mathematician.email + ' registered!'})
                            })
                            .catch(err => {
                                res.send('error: ' + err)
                            })
                    })

                })
            } else{
                res.json({error: "Member already exists"})
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

// route where members can log in
mathematicians.post('/login', (req, res) => {
    Mathematician.findOne({
        email: req.body.email
    })
        .then(mathematician => {
            if(mathematician) {
                if(bcrypt.compareSync(req.body.password, mathematician.password)) {
                    const payload = {
                        // the key is the from the collection and the value is the data being passed in the request
                        _id: mathematician._id,
                        first_name: mathematician.first_name,
                        last_name: mathematician.last_name,
                        university: mathematician.university,
                        email: mathematician.email
                    };
                    let token = jwt.sign(payload, secret, {
                        expiresIn: 1440
                    });
                    //res.send(token)
                    // when token is issued, set as a cookie
                    /*
                    This method of issuing tokens is ideal for a browser environment because its sets an httpOnly cookie
                    which helps secure the client from certain vulnerabilities such as XSS.
                     */
                    res.cookie('token', token, { httpOnly: true })
                        .sendStatus(200);
                } else {
                    res.json({error: "Mathematician does not exist"})
                }
            } else {
                res.json({error: "Mathematician does not exist"})
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

// update existing conference objects in the mongodb db
// include id parameter in order to know which specific object to update
mathematicians.post('/update/:id', (req, res) => {
    // retrieve the item which needs to be updated in the db
    console.log(req.body);
    Mathematician.findById(req.params.id, function (err, mathematician) {
        // check if the conference can be successfully retrieved from the db
        if (!mathematician) {
            res.status(404).send('item could not be found in the db');
        }
        /* if the conference item can be retrieved from the db,
        update its properties with the new values which are passed in the request
        */
        else {
            mathematician.first_name = req.body.mathematician_name;
            mathematician.last_name = req.body.mathematician_last_name;
            mathematician.university = req.body.mathematician_university;
            mathematician.email = req.body.mathematician_email;

            // save the new values to the db
            mathematician.save()
                .then(mathematician => {
                    res.json('Mathematician has been updated');
                })
                .catch(err => {
                    res.status(400).send('Update failed');
                });
        }
    })
});


// route to get the profile of the logged in member
mathematicians.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], secret)

    Mathematician.findOne({
        _id: decoded._id
    })
        .then(mathematician => {
            if(mathematician) {
                res.json(mathematician)
            } else {
                res.send("Mathematician does not exist")
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

// delete existing conference objects in the mongodb db
// include id parameter in order to know which specific object to delete
mathematicians.delete('/delete/:id', (req, res) => {
    // retrieve the item which needs to be updated in the db
    Mathematician.findByIdAndRemove(req.params.id)
        .then(mathematician => {
            if(!mathematician) {
                return res.status(404).send({
                    message: "Mathematician not found with id " + req.params.id
                });
            }
            res.send({message: "Mathematician deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Mathematician not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete mathematician with id " + req.params.id
        });
    });
});

module.exports = mathematicians




