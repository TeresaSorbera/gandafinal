// to attach endpoints to the server, get access to the express router
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const { check } = require('express-validator/check')
const { body,validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')
const flash = require('connect-flash')
const session = require('express-session')
// express instance
const app = express()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
// const passport = require('passport');

const port = process.env.PORT || 6001

app.use(bodyParser.json())
app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)
app.use(expressValidator());
app.use(cookieParser());

// require('./config/passport') (passport);
// app.use(passport.initialize());
// app.use(passport.session());

// Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true}
}));

// // Express Messages Middleware
// app.use(require('connect-flash')());
// app.use(function(req, res, next) {
//     res.locals.messages = require('express-messages')(req, res);
//     next();
// });
//
// app.get('*', function (req, res, next) {
//     res.locals.mathematician = req.mathematician || null;
// });

// const mongoURI = 'mongodb://localhost:27017/ganda'
 const mongoURI = 'mongodb+srv://TeresaSorbera:kfN6Q9pgh4JfZFey@cluster0-vqnfa.mongodb.net/test?retryWrites=true&w=majority';

// connect to the mongodb database
// useNewUrlParser is a configuration object
mongoose
    .connect(mongoURI, {useNewUrlParser: true})
    .then(() => console.log("MongoDB connected now"))
    .catch(err => console.log(err))

// import model
let conference = require('./models/Conference')

// when there is a request, go to Users.js in the routes folder
// import the models
const Users = require('./routes/Users')
const Admin = require('./routes/Admin')
const Conferences = require('./routes/Conferences')
const FrontEnd = require('./routes/FrontEnd')
const Universities = require('./routes/Universities')
const Members = require('./routes/Members')
const Mathematicians = require('./routes/Mathematicians')

// the first parameter is the base route
// all the routes configured to use Conferences will have /conferences as the base route
// the second parameter is the router which is required above
app.use('/users', Users)
app.use('/conferences', Conferences)
app.use('/frontend', FrontEnd)
app.use('/universities', Universities)
app.use('/members', Members)
app.use('/mathematicians', Mathematicians)

app.listen(port, () => {
    console.log("Server is running on port: " + port)
})
