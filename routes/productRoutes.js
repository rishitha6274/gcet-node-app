import express from 'express';
import productModel from '../models/productModel.js';
import auth from '../middleware/auth.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  try {
    const products = await productModel.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

productRouter.post('/add', auth, async (req, res) => {
  try {
    const { name, description, imgUrl, price } = req.body;
    const newProduct = new productModel({ name, description, imgUrl, price });
    const result = await newProduct.save();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error });
  }
});

productRouter.delete('/:id', auth, async (req, res) => {
  try {
    const result = await productModel.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted', product: result });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
});

export default productRouter;
