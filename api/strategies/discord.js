const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport')
const scopes = ['identify', 'email', 'guilds']
const sequelize = require('../database/db')

passport.use(new DiscordStrategy({
    clientID: '715939386323370006',
    clientSecret: 'x7at3g9WDKAacAB_7WMTQs0lUGX2WAAY',
    callbackURL: '/auth/redirect',
    scope: scopes
}, (accesToken, refreshToken, profile, done) => {
    sequelize.models.users.create({userID: profile.id, accesToken: accesToken, refreshToken: refreshToken, username: profile.username, userAvatarUrl: "da", guilds: "da"})
}))