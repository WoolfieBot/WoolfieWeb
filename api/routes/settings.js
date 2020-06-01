const {getPermissions} = require("../utils/utils");
const router = require('express').Router();

function isAuthorized(req, res, next) {
    if(req.user) {
        console.log("User is logged in. settings");
        next();
    }
    else {
        console.log("User is not logged in.");
        res.json({
            response: 'error',
            msg: 'User are is not logged in.'
        })
    }
}

router.get('/:gid?', isAuthorized, (req, res) => {
    if(req.query.gid) {
        const guildMemberPermissions = new Map();
        let guilds = req.user.guilds;
        for(var k in JSON.parse(guilds)) {
            let guild = JSON.parse(guilds)[k];
            const perm = getPermissions(guild.permissions);
            guildMemberPermissions.set(guild.id, perm);
        };
        let perms = [];
        guildMemberPermissions.get(req.query.gid).forEach((v,k) => {
            perms.push(k)
        })
        if(perms.includes('ADMINISTRATOR') || perms.includes('MANAGE_GUILD')) {
            res.render('settings', {username: req.user.username, location: "Пфьывыфвф"})
        } else {
            res.json({
                msg: 'Хахаха саси'
            })
        }
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;