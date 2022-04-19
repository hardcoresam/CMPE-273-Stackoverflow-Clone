"use strict";

const JwtStrategy = require("passport-jwt").Strategy;

var cookieExtractor = function (req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['access-token'];
    }
    return token;
};

module.exports = (passport) => {
    var opts = {
        jwtFromRequest: cookieExtractor,
        secretOrKey: process.env.JWT_SECRET_KEY,
        passReqToCallback: true
    };
    passport.use(
        new JwtStrategy(opts, (req, jwt_payload, callback) => {
            req.user = jwt_payload.user;
            callback(null, []);
        })
    )
}