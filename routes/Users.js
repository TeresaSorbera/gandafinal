const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const expressValidator = require('express-validator')
//const { check } = require('express-validator/check')
const { check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// load the schema from the models directory
const User = require("../models/User")
users.use(cors())

process.env.SECRET_KEY = 'secret'

// route where new users can register
users.post('/register', [
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
    // save this data to the userData object - represents the document to be inserted into Mongo
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        university: req.body.university,
        email: req.body.email,
        password: req.body.password,
        created: today
    }

    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if(!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    User.create(userData)
                        .then(user => {
                            res.json({status: user.email + ' registered!'})
                        })
                        .catch(err => {
                            res.send('error: ' + err)
                        })
                })
            } else{
                res.json({error: "User already exists"})
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

// route where users can log in
users.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if(user) {
                if(bcrypt.compareSync(req.body.password, user.password)) {
                    const payload = {
                        // the key is the from the collection and the value is the data being passed in the request
                        _id: user._id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        university: user.university,
                        email: user.email
                    }
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.send(token)
                } else {
                    res.json({error: "User does not exist"})
                }
            } else {
                res.json({error: "User does not exist"})
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

// route to get the profile of the logged in user
users.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process. env.SECRET_KEY)

    User.findOne({
        _id: decoded._id
    })
        .then(user => {
            if(user) {
                res.json(user)
            } else {
                res.send("User does not exist")
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

module.exports = users
