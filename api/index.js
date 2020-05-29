// Imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const strategy = require('./strategies/discord');
const db = require('./database/db')
const models = require('./models/index')

// Routes

const authRoute = require('./routes/auth');

app.use(session({
    secret: 'yasral22832',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    saveUninitialized: false
}))

// Passport

app.use(passport.initialize());
app.use(passport.session())

// Middleware

app.use('/auth', authRoute);
app.use(bodyParser.urlencoded({extended: true}))


app.listen(3000, () => console.log('Server started'))