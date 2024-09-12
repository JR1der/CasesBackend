import mongoose, {Schema} from "mongoose";
import {ProductDocumentInterface} from "../interfaces/ProductInterface";

export const ProductSchema = new Schema({
  title: {
    en: {type: String, required: true},
    ua: {type: String, required: true},
  },
  type: {
    en: {type: String, required: true},
    ua: {type: String, required: true},
  },
  descriptions: [{
    en: {type: String, required: true},
    ua: {type: String, required: true},
  }],
  images: [{
    image: {
      name: {type: String, required: true},
      type: {type: String, required: true},
      data: {type: Buffer, required: true},
    }
  }]
})

export const ProductModel = mongoose.model<ProductDocumentInterface>("Product", ProductSchema);
