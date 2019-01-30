const httpStatus = require('http-status');
const passport = require('passport');
const APIError = require('../utils/APIError');
const { roles } = require('../../constants/roles');

const handleJWT = (req, _, next, allowedRoles) => async (err, user, info) => {
    const error = err || info;
    const apiError = new APIError({
        message: error ? error.message : 'Unauthorized',
        status: httpStatus.UNAUTHORIZED,
        stack: error ? error.stack : undefined,
    });

    try {
        if (error || !user) throw error;
    } catch (e) {
        return next(apiError);
    }

    if (!allowedRoles.includes(user.role)) {
        apiError.status = httpStatus.FORBIDDEN;
        apiError.message = 'Forbidden';
        return next(apiError);
    } if (err || !user) {
        return next(apiError);
    }

    req.user = user;

    return next();
};

exports.authorize = (allowedRoles = roles) => (req, res, next) => passport.authenticate(
    'jwt', { session: false },
    handleJWT(req, res, next, allowedRoles),
)(req, res, next);
