import { model, Schema } from "mongoose";
import { Category } from "../../models/Category";

const moment = require("moment-timezone");

const CategorySchema = new Schema<Category>(
  {
    name: { type: String, required: true },
    created_at: { type: Date, default: moment(Date.now()).utc(0) },
  },
  { collection: "Categories" }
);

const CategoryModel = model<Category>("Categories", CategorySchema);

export { CategoryModel, CategorySchema };
