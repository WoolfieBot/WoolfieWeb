const router = require('express').Router();
const { getPermissions } = require('../utils/utils');
const sequelizeClient = require('../database/clientdb')

function isAuthorized(req, res, next) {
    if(req.user) {
        console.log("User is logged in.");
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

router.get('/', isAuthorized, async (req, res) => {
    const { guilds } = req.user;
    const guildMemberPermissions = new Map();
    const clientGuilds = await sequelizeClient.models.guilds.findAll();
    for(var k in JSON.parse(guilds)) {
        let guild = JSON.parse(guilds)[k];
        const perm = getPermissions(guild.permissions);
        guildMemberPermissions.set(guild.id, perm);
    };
    res.render('dashboard', {
        username: req.user.username,
        discordId: req.user.userID,
        guilds: JSON.parse(req.user.guilds),
        permissions: guildMemberPermissions,
        clientGuilds: clientGuilds
    });
});

module.exports = router;