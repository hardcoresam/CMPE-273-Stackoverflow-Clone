const passport = require('passport')

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

const User = require('./../models/User')

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    
    User.findOne({where:{id:jwt_payload.user.id}}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            //or you could create a new account
        }
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});