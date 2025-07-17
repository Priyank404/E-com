const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const ownerModel = require('../models/ownerModel');

module.exports.isLoggedin = async (req, res, next) => {
    if (!req.cookies.token) return res.status(401).json({ loggedIn: false });

    try {
        let decode = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user
        if (decode.role === 'owner') {
            user = await ownerModel.findOne({ _id: decode.id }).select('-password');
            } else {
            user = await userModel.findOne({ _id: decode.id }).select('-password');
            }

            if (!user) {
            return res.status(401).json({ loggedIn: false });
        }
        req.user = user;
        req.role = decode.role
        next();
    } catch (error) {
        return res.status(401).json({ loggedIn: false, message: 'Invalid token'});
    }
};