import {Request, Response} from "express";
import {ProductModel} from "../models/ProductModel";

// Get all products
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find();

    return res.status(200).json({
      products: products.map((product) => ({
        id: product._id,
        title: product.title,
        description: product.descriptions,
        images: product.images.map((img) => ({
          name: img.image.name,
          type: img.image.type,
          data: img.image.data,
        })),
      })),
    });
  } catch (error) {
    return res.status(500).json({error: "Error retrieving products"});
  }
};

// Create a product
export const createProduct = async (req: Request, res: Response) => {
  const {title, type, description, images} = req.body;

  if (!title || !title.en || !title.ua || !description || !type) {
    return res.status(400).json({error: "Title, type, and description are required"});
  }

  try {
    const imageArray = images.map((imageData: any) => ({
      image: {
        name: imageData.name,
        type: imageData.type,
        data: Buffer.from(imageData.data, "base64"),
      },
    }));

    const newProduct = new ProductModel({
      title: {
        en: title.en,
        ua: title.ua,
      },
      type: {
        en: type.en,
        ua: type.ua,
      },
      description: description.map((desc: any) => ({
        en: desc.en,
        ua: desc.ua,
      })),
      images: imageArray,
    });
    await newProduct.save();

    return res.status(201).json({
      message: "Product created successfully",
      product: {
        id: newProduct._id,
        title: newProduct.title,
        description: newProduct.descriptions,
        images: newProduct.images.map((img) => ({
          name: img.image.name,
          type: img.image.type,
        })),
      },
    });
  } catch (error) {
    return res.status(500).json({error: "Error creating product"});
  }
}

// Update a product
export const updateProduct = async (req: Request, res: Response) => {
  const {id} = req.params;
  const {title, type, description, images} = req.body;

  if (!title || !title.en || !title.ua || !description || !type) {
    return res.status(400).json({error: "Title, type, and description are required"});
  }

  try {
    const updatedData = {
      title: {
        en: title.en,
        ua: title.ua,
      },
      type: {
        en: type.en,
        ua: type.ua,
      },
      description: description.map((desc: any) => ({
        en: desc.en,
        ua: desc.ua,
      })),
      images: images.map((imageData: any) => ({
        image: {
          name: imageData.name,
          type: imageData.type,
          data: Buffer.from(imageData.data, "base64"),
        },
      })),
    };

    const updatedProduct = await ProductModel.findByIdAndUpdate(id, updatedData, {new: true});

    if (!updatedProduct) {
      return res.status(404).json({error: "Product not found"});
    }

    return res.status(200).json({
      message: "Product updated successfully",
      product: {
        id: updatedProduct._id,
        title: updatedProduct.title,
        description: updatedProduct.descriptions,
        images: updatedProduct.images.map((img) => ({
          name: img.image.name,
          type: img.image.type,
        })),
      },
    });
  } catch (error) {
    return res.status(500).json({error: "Error updating product"});
  }
};

// Delete a product
export const deleteProduct = async (req: Request, res: Response) => {
  const {id} = req.params;

  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({error: "Product not found"});
    }

    return res.status(200).json({message: "Product deleted successfully"});
  } catch (error) {
    return res.status(500).json({error: "Error deleting product"});
  }
};