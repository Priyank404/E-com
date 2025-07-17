const express = require('express');
const router = express.Router();

const productModel = require('../models/productModel');


router.get('/',async (req, res) => {
  let products = await productModel.find();

  const updatedProducts = products.map(p => {
      return {
        ...p._doc,
        imageUrl: `data:image/jpeg;base64,${Buffer.from(p.image).toString('base64')}`
      };
  });

  res.json({ success: true, products: updatedProducts });
});

module.exports = router;