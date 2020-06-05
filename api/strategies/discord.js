const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const db = require('../database/db');

passport.serializeUser((user, done) => {
    console.log("Serialize");
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    const user = await db.models.users.findOne({where:{ id: id }});
    if(user)
        done(null, user);
});

passport.use(new DiscordStrategy({
    clientID: '658593409401094147',
    clientSecret: 'omHeshHtC1c21NcMGAAuwHYgaiWHbHoz',
    callbackURL: 'http://localhost:3000/api/redirect',
    scope: ['identify', 'guilds', 'guilds.join']
}, async (accessToken, refreshToken, profile, done) => {
    console.log(accessToken)
    try {
        const user = await db.models.users.findOne({where:{ userID: profile.id }});
        if(user)
        {
            console.log("User exists.");
            let serialize = "";
            profile.guilds.forEach((x, i) => {
                console.log(x.name)
                serialize += `"${i}":{"id":"${x.id}","permissions":"${x.permissions}","features":[${x.features.map(x => `"${x}"`)}],"name":"${x.name}","icon":"${x.icon}"},`
            })
            await db.models.users.update({
                username: `${profile.username}#${profile.discriminator}`,
                guilds: `{${serialize.substr(0, serialize.length - 1)}}`
            },{where: {userID: profile.id}});
            done(null, user);
        }
        else {
            console.log("User does not exist");
            let serialize = "";
            profile.guilds.forEach((x, i) => {
                serialize += `"${i}":{"id":"${x.id}","permissions":"${x.permissions}","features":[${x.features.map(x => `"${x}"`)}],"name":"${x.name}","icon":"${x.icon}"},`
            })
             await db.models.users.create({ userID: profile.id, username: profile.username, guilds: `{${serialize.substr(0, serialize.length - 1)}}`,userAvatarUrl: 'da', accesToken: accessToken, refreshToken: refreshToken });
            const user = await db.models.users.findOne({where:{ userID: profile.id }});
            done(null, user);
        }
    }
    catch(err) {
        console.log(err);
        done(err, null);
    }
}));