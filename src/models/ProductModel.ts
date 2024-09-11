import mongoose, {Schema} from "mongoose";
import {ProductDocumentInterface} from "../interfaces/ProductInterface";

export const ProductSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
})

export const ProductModel = mongoose.model<ProductDocumentInterface>("Product", ProductSchema);
