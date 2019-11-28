/*
Here is custom express middleware that sits between a request and a protected route
and verifies if the request is authorized.
Specifically, this middleware function will look for the token in the request body,
query string, headers, or cookies in that order and then validate it.
 */

const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';
const withAuth = function(req, res, next) {
    const token =
        req.body.token ||
        req.query.token
    console.log(req);
    console.log(req.cookies);
    if (!token) {
        res.status(401).send('Unauthorized: No token provided');
    } else {
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                res.status(401).send('Unauthorized: Invalid token');
            } else {
                req.email = decoded.email;
                next();
            }
        });
    }
}
module.exports = withAuth;
