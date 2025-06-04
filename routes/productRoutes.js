import express from 'express';
import productModel from '../models/productModel.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  try {
    const products = await productModel.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

productRouter.get('/test', (req, res) => {
  res.json({ message: 'Products route working!' });
});
console.log("✅ Product router loaded");

export default productRouter;
