const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { jwtSecret } = require('./app');

const jwtOptions = {
    secretOrKey: jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
};

const jwt = (payload, done) => {
    try {
        return done(null, payload || false);
    } catch (error) {
        return done(error, false);
    }
};

exports.jwt = new JwtStrategy(jwtOptions, jwt);
