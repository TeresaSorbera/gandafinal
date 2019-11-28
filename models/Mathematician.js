const mongoose = require('mongoose');
const Schema = mongoose.Schema

// an object is passed to the schema which is composed of key/value pairs
let mathematicianSchema = new Schema({
    first_name: {
        type: String,
        trim: true
    },
    last_name: {
        type: String,
        trim: true
    },
    university: {
        type: String
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: [true, "Email not unique"]
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    admin: {
        type: Number
    }
});

// presave hook - a function that Mongoose runs just before saving a record to Mongo
// hash the password before a new user record is stored in the database - call the pre method on schema
// the method takes 2 arguments - 1. the hook name 2. the function itself
// middleware provides a way to process input as its passed through a chain of commands
// this contains the information the user entered in the sign-up form
// the variable user holds the user object and its data

// module.exports = User = mongoose.model('users', UserSchema)
// export the model so it can be used in routes
module.exports = mongoose.model('Mathematician', mathematicianSchema);
