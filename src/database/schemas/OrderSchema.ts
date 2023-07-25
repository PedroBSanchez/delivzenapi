import { Model, model, Schema } from "mongoose";
import { Order } from "../../models/Order";
import { number } from "joi";
const moment = require("moment-timezone");

/*
  Order status
  0 - closed
  1 - open
  2 - transit
*/

const OrderSchema = new Schema<Order>(
  {
    status: { type: Number, required: true, default: 1 },
    totalValue: { type: Number, required: true },
    code: { type: Number, required: true, default: 0 },
    client: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    address: { type: String, required: true },
    adressNumber: { type: String, required: true },
    complement: { type: String },
    neighborhood: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    items: { type: [], required: true },
    created_at: { type: Date, default: moment(Date.now()).utc(0) },
  },
  { collection: "Orders" }
);

const OrderModel = model<Order>("Orders", OrderSchema);

export { OrderModel, OrderSchema };
