const router = require('express').Router();
const passport = require('passport');
const { getPermissions } = require('../utils/utils');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(cb);
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getMilliseconds() + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.use(upload.single('rankbg'))

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

router.post('/upload/rankbg', upload.single('rankbg'), (req, res) => {
    console.log('sdsds')
    if(req.file) {
        res.sendStatus(200)
    } else {
        res.status(200);
    }
})

module.exports = router;