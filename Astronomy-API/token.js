const jwt = require('jsonwebtoken')


function createToken(id) {
    const payload = { id };
    const options = { expiresIn: '1d' };
    const secret = 'egypt';
    const token = jwt.sign(payload, secret, options);
    return token
}

function getId(token) {
    const decodedToken = jwt.verify(token, 'egypt');
    return decodedToken.id
}

module.exports = { createToken, getId }