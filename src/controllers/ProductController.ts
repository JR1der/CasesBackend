import {Request, Response} from "express";
import {ProductModel} from "../models/ProductModel";

export const getProducts = async (req: Request, res: Response) => {
  const products = await ProductModel.find();

  return res.status(200).json({
    products: products.map((product) => ({
      id: product._id,
      title: product.title,
      description: product.description,
    })),
  });
};

export const createProduct = async (req: Request, res: Response) => {
  const {title, description} = req.body;

  if (!title || !description) {
    return res.status(400).json({error: "Title and description are required"});
  }

  try {
    const newProduct = new ProductModel({title, description});
    await newProduct.save();

    return res.status(201).json({
      message: "Product created successfully",
      product: {
        id: newProduct._id,
        title: newProduct.title,
        description: newProduct.description,
      },
    });
  } catch (error) {
    return res.status(500).json({error: "Error creating product"});
  }
}