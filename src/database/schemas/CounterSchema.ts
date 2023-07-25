import { model, Schema } from "mongoose";

const CounterSchema = new Schema<any>(
  {
    name: { type: String, required: true },
    seq: { type: Number, required: true },
  },
  { collection: "Counter" }
);

const CounterModel = model<any>("Counter", CounterSchema);

export { CounterModel, CounterSchema };
