import {Document} from "mongoose";

export interface ProductInterface {
  title: string;
  description: string;
}

export interface ProductDocumentInterface extends Document {
  title: string;
  description: string;
}