const mongoose = require('mongoose');

const ownerModel = mongoose.Schema({
    username: String,
    fullName: String,
    email: String,
    password: String,
    contactNumberL: Number,
    gstin: String,
    orders:[]
})

module.exports = mongoose.model('owner', ownerModel);
