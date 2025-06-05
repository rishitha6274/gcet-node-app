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

productRouter.post("/add", async(req, res)=>{
    const {name,description,imgUrl,price} = req.body
    const result = await productModel.insertOne({name, description, imgUrl, price});
    return res.json(result);
})

export default productRouter;

