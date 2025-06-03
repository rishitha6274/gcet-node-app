import express from 'express'
import productModel from "../models/productModel.js";

const productRouter = express.Router()

productRouter.get("/products", async (req, res) => {
  try {
    const products = await productModel.find(); 
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ message: "Error", error });
  }
});

export default productRouter