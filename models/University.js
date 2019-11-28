const mongoose = require('mongoose');
const Schema = mongoose.Schema

// an object is passed to the schema which is composed of key/value pairs
// objects in an object
let universitySchema = new Schema({
    university_name: {
        type: String,
        trim: true
    },
    university_country: {
        type: String,
        trim: true
    },
    university_city: {
        type: String,
        trim: true
    }
});

// export the schema so it can be imported into the server.js file
// this actually creates a model from the schema
// the model name is in quotation marks followed by the schema name
module.exports = mongoose.model('University', universitySchema);
