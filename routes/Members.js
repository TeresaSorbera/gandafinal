const express = require('express')
const members = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const expressValidator = require('express-validator')
//const { check } = require('express-validator/check')
const { check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');


// load the schema from the models directory
const Member = require("../models/Member")
members.use(cors())

process.env.SECRET_KEY = 'secret'

members.get('/list',( req, res) => {
    // retrieve all conferences from the database
    // use data model name (contained in the Conference variable) + find + callback function
    Member.find(function(err, members) {
        if(err) {
            console.log(err);
        }
        // attach the data being retrieved from the db to the response object
        // conferences contains the data
        else {
            res.json(members);
        }
    });
});

// get one specific conference
members.get('/:id', (req, res) => {
    // extract the value which is available in the id parameter of the url
    // when accessing parameters from the url, access the params object followed by the name of the parameter
    let id = req.params.id;
    // find the id passed in through the request in the db
    Member.findById(id, function(err, member) {
        if(err) {
            console.log(err);
        }
        // attach the data being retrieved from the db to the response object
        // conference contains the data
        else {
            res.json(member);
        }
    });
});

// route where new members can register
members.post('/register', [
    check('first_name').isLength({ min: 3 }).withMessage('Not long enough.'),
    check('last_name').isLength({ min: 2 }),
    check('university').isLength({ min: 2 }),
    check('email').isEmail(),
    check('password').isLength({ min: 6 })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const today = new Date()
    // req.body.{name} is the information coming through the browser in the request object
    // save this data to the memberData object - represents the document to be inserted into Mongo
    const memberData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        university: req.body.university,
        email: req.body.email,
        password: req.body.password,
        created: today
    }

    Member.findOne({
        email: req.body.email
    })
        .then(member => {
            if(!member) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    memberData.password = hash
                    Member.create(memberData)
                        .then(member => {
                            res.json({status: member.email + ' registered!'})
                        })
                        .catch(err => {
                            res.send('error: ' + err)
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
members.post('/login', (req, res) => {
    Member.findOne({
        email: req.body.email
    })
        .then(member => {
            if(member) {
                if(bcrypt.compareSync(req.body.password, member.password)) {
                    const payload = {
                        // the key is the from the collection and the value is the data being passed in the request
                        _id: member._id,
                        first_name: member.first_name,
                        last_name: member.last_name,
                        university: member.university,
                        email: member.email
                    }
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.send(token)
                } else {
                    res.json({error: "Member does not exist"})
                }
            } else {
                res.json({error: "Member does not exist"})
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

// update existing conference objects in the mongodb db
// include id parameter in order to know which specific object to update
members.post('/update/:id', (req, res) => {
    // retrieve the item which needs to be updated in the db
    Member.findById(req.params.id, function (err, member) {
        // check if the conference can be successfully retrieved from the db
        if (!member) {
            res.status(404).send('item could not be found in the db');
        }
        /* if the conference item can be retrieved from the db,
        update its properties with the new values which are passed in the request
        */
        else {
            member.member_name = req.body.member_name;
            member.member_last_name = req.body.member_last_name;
            member.member_university = req.body.member_university;
            member.member_email = req.body.member_email;

            // save the new values to the db
            member.save()
                .then(member => {
                    res.json('Member has been updated');
                })
                .catch(err => {
                    res.status(400).send('Update failed');
                });
        }
    })
});


// route to get the profile of the logged in member
members.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process. env.SECRET_KEY)

    Member.findOne({
        _id: decoded._id
    })
        .then(member => {
            if(member) {
                res.json(member)
            } else {
                res.send("Member does not exist")
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

// delete existing conference objects in the mongodb db
// include id parameter in order to know which specific object to delete
members.delete('/delete/:id', (req, res) => {
    // retrieve the item which needs to be updated in the db
    Member.findByIdAndRemove(req.params.id)
        .then(member => {
            if(!member) {
                return res.status(404).send({
                    message: "Member not found with id " + req.params.id
                });
            }
            res.send({message: "Member deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Member not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete member with id " + req.params.id
        });
    });
});

module.exports = members




