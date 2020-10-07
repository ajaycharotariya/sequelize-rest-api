const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = {
    verifyToken: function (req, res, next) {

        const token = req.headers['x-access-token'];
        if (!token) return res.status(401).send({auth: false, message: 'No token provided.'});

        jwt.verify(token, process.env.SECRET, function (err, decoded) {
            if (err && err.name === 'UnauthorizedError') {
                // jwt authentication error
                return res.status(401).json({auth: false, message: 'Invalid Token'});
            }

            if (err && err.name === 'TokenExpiredError' || err && err.message == 'jwt expired') {
                // jwt expired
                return res.status(401).json({auth: false, message: "Token expired"})
            }

            if (err) return res.status(401).send({auth: false, message: 'Failed to authenticate token.'});
            else {
                req.decoded = decoded;
                //console.log(JSON.stringify(decoded));
                return next();
            }
        });
    }
}
