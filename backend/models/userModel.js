const mongoose = require('mongoose');

const userModel = mongoose.Schema({
    username: String,
    fullname: {
        type: String,
        trim: true
    },
    email: String,
    password: String,
    address: String,
    contactNumber: String,
    profilePicture: String,
    cart:{
        type: Array,
        default:[]
    },
    orders:{
        type: Array,
        default:[]
    }
})


module.exports = mongoose.model('user', userModel);