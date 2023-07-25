import { model, Schema } from "mongoose";
import { Item } from "../../models/Item";
import { Additional } from "../../models/Additional";
const moment = require("moment-timezone");

const ItemSchema = new Schema<Item>(
  {
    name: { type: String, required: true },
    value: { type: Number, required: true },
    description: { type: String },
    additional: { type: [] },
    category: { type: String, required: true },
    created_at: { type: Date, default: moment(Date.now()).utc(0) },
  },
  { collection: "Items" }
);

ItemSchema.pre("save", async function (next) {
  this.additional.map((element, index) => {
    element.code = index + 1;
  });

  next();
});

const ItemModel = model<Item>("Items", ItemSchema);

export { ItemModel, ItemSchema };
