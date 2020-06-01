const router = require('express').Router();
const passport = require('passport');
const { getPermissions } = require('../utils/utils');

router.get('/auth', passport.authenticate('discord'));
router.get('/redirect', passport.authenticate('discord', {
    failureRedirect: '/forbidden',
    successRedirect: '/dashboard'
}));

router.get('/', (req, res) => {
    res.json({
        response: 'error',
        msg: 'Bad request'
    })
})

router.get('/check', (req, res) => {
    if(req.user) {
        res.json({
            response: 200,
            msg: req.user
        })
    } else {
        res.json({
            response: null,
            msg: 'Problems with authentication, contact with administration!'
        })
    }
})

router.get('/logout', (req, res) => {
    if(req.user) {
        req.logout();
        res.redirect('/');
    } else {
        res.json({
            response: 'error',
            msg: 'User was not found'
        })
    }
});

module.exports = router;