const mongoose = require('mongoose');
const Schema = mongoose.Schema

// an object is passed to the schema which is composed of key/value pairs
// objects in an object
let conferenceSchema = new Schema({
    conference_name: {
        type: String,
        trim: true
    },
    conference_description: {
        type: String,
        trim: true
    },
    conference_date: {
        type: Date,
        default: Date.now
    },
    conference_university: {
        type: String,
        required: true
    }
});

// export the schema so it can be imported into the server.js file
// this actually creates a model from the schema
// the model name is in quotation marks followed by the schema name
module.exports = mongoose.model('Conference', conferenceSchema);
