const mongoose = require('mongoose');

const productModel = mongoose.Schema({
    image: Buffer,
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

module.exports = mongoose.model('product', productModel);