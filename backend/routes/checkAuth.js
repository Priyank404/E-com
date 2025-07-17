const express = require('express');
const router = express.Router();
const {isLoggedin} = require('../middleware/isLoggedin');


router.get('/', isLoggedin, (req, res) => {
    res.status(200).json({ loggedIn: true, user: req.user });
});



module.exports = router;