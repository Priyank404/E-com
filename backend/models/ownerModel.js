const mongoose = require('mongoose');

const ownerModel = mongoose.Schema({
    username: String,
    email: String,
    fullname : {
        type: String,
        minlength: 3,
        trim: true
    },
    password: String,
    contactNumberL: Number,
    gstin: String,
    orders:[]
})

module.exports = mongoose.model('owner', ownerModel);
