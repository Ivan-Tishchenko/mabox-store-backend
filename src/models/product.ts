import { Schema, model, ObjectId } from "mongoose";

const baseImageUrl = "";

const productSchema = new Schema(
  {
    imagesURL: {
      type: [String],
      default: [`${baseImageUrl}`],
    },
    prevImageURL: {
      type: String,
      default: baseImageUrl,
    },
    name: {
      type: String,
      require: true,
    },
  },
  {
    versionKey: false,
  }
);

const Product = model("products", productSchema);

export { Product };
