import {Document} from "mongoose";

export interface ProductInterface {
  title: {
    en: string;
    ua: string;
  };
  type: {
    en: string;
    ua: string;
  }
  descriptions: [{
    en: string;
    ua: string;
  }];
  images: [{
    image: {
      name: string;
      type: string;
      data: Buffer;
    }
  }]
}

export interface ProductDocumentInterface extends Document {
  title: {
    en: string;
    ua: string;
  };
  type: {
    en: string;
    ua: string;
  }
  descriptions: [{
    en: string;
    ua: string;
  }];
  images: [{
    image: {
      name: string;
      type: string;
      data: Buffer;
    }
  }]
}