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