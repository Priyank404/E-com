const mongoose = require('mongoose');

const productModel = mongoose.Schema({
    image: String,
    name: String,
    price: Number,
    discountedPrice: {
        type: Number,
        default: 0
    },
    bgColor: String,
    textColor: String,
    panelColor: String
})