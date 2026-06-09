// passport.js
// Raphael Daveal | Health Clinic App | CSE 341

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
    },
    function (accessToken, refreshToken, profile, done) {
        const user = {
            id: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value
        };
        return done(null, user);
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});