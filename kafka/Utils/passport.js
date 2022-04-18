"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "kkkk";
const passport = require("passport");

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    const user = {userid: jwt_payload.user.id}
    console.log(jwt_payload)
    console.log("in pasport")
    return done(null, user);
}));