const express = require('express');
const router = express.Router();

const productModel = require('../models/productModel');



router.get('/',async (req, res) => {
  let products = await productModel.find();

  const updatedProducts = products.map(p => {
      return {
        ...p._doc,
        imageUrl: `http://localhost:3000/${p.image}` 
      };
  });

  res.json({ success: true, products: updatedProducts });
});

module.exports = router;