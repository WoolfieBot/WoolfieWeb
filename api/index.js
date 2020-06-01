require('./strategies/discord');
require('./models/index');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const session = require('express-session');
const passport = require('passport');
const db = require('./database/db');
const path = require('path');

var SequelizeStore = require('connect-session-sequelize')(session.Store);

// Routes
const apiRoute = require('./routes/api');
const dashboardRoute = require('./routes/dashboard');
const settingsRoute = require('./routes/settings')

app.use(session({
    secret: 'some random secret',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    saveUninitialized: false,
    resave: false,
    name: 'discord.oauth2',
    store: new SequelizeStore({
        db: db
    })
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware Routes
app.use('/api', apiRoute);
app.use('/dashboard', dashboardRoute);
app.use('/settings', settingsRoute);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    if(req.user) {
        res.redirect('/dashboard')
    } else {
        res.render('home')
    }
});


app.listen(3000, () => console.log(`Now listening to requests on port`));