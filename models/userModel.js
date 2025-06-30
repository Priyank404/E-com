const mongoose = require('mongoose');

const userModel = mongoose.Schema({
    username: String,
    fullName: String,
    email: String,
    password: String,
    address: String,
    isAdmin: Boolean,
    contactNumberL: Number,
    profilePic: String,
    cart:[],
    orders:[]
})


module.exports = mongoose.model('user', userModel);