const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./database');
const User = connection.models.User;
const validPassword = require("../lib/passwordUtils").validPassword;

const customFields = {
    usernameField: "username",
    passwordField: "password"
}

const verifyCallback = (username, password, done) => {
    connection.query(`SELECT * FROM users WHERE username = $1`, [username])
        .then((rows) => Promise.resolve(rows[0]))
        .then((user) => {
            if (!user) {
                return done(null, false);
            }

            const isValid = validPassword(password, user.hash, user.salt);

            if (isValid) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch((err) => {
            done(err);
        });
}

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    connection.query(`SELECT * FROM users WHERE users.id = $1`, [userId])
        .then((rows) => Promise.resolve(rows[0]))
        .then((user) => {
            done(null, user);
        })
        .catch(done)
})