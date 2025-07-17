const jwt = require('jsonwebtoken');
module.exports.generateToken = (user,role) =>{
    return jwt.sign({email: user.email, id: user._id, role:role}, process.env.JWT_KEY)
}