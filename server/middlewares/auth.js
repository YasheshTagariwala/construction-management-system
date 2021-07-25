const jwt = require('jwt-simple');
const {jwtSecret} = require('../config');

const authorize = async (req, res, next) => {
    try {
        const {authorization} = req.headers;

        const apiError = new Error({
            message: 'Unauthorized',
            status: 403,
        });

        if (!authorization) {
            return next(apiError);
        }

        const token = authorization.split(' ')[1];

        try {
            const tokenResult = jwt.decode(token, jwtSecret);

            if (!tokenResult || !tokenResult.exp || !tokenResult.id) {
                apiError.message = 'Malformed Token';

                return next(apiError);
            }

            const user = {
                id: tokenResult.id,
            };
            if (!user) {
                return next(apiError);
            }
            req.user = user;
            return next();
        } catch (e) {
            apiError.message = 'Token Expired';
            return next(apiError);
        }
    } catch (e) {
        return next(
            new Error({
                message: 'Internal Server Error',
                status: 500,
            })
        );
    }
};

exports.authorize = (req, res, next) => authorize(req, res, next);
