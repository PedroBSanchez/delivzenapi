import { Model } from "mongoose";

import { OrderModel } from "../database/schemas/OrderSchema";
import { Order } from "../models/Order";
import { CounterModel } from "../database/schemas/CounterSchema";
import { InsertOneResult, UpdateResult } from "mongodb";

class OrderRepository {
  private model: Model<Order>;
  private modelCounter: Model<any>;

  constructor() {
    this.model = OrderModel;
    this.modelCounter = CounterModel;
  }

  public async create(order: Order) {
    let seq: any = await this.modelCounter.findOne({ name: "orderCounter" });
    let seqValue = 0;
    if (!seq) {
      await this.modelCounter.create({ name: "orderCounter", seq: 1 });
    } else {
      seqValue = seq.seq;
      await this.modelCounter.updateOne(
        { name: "orderCounter" },
        { $set: { seq: seq.seq + 1 } }
      );
    }
    console.log("🧆 " + seqValue);
    order.code = seqValue;
    return await this.model.create(order);
  }

  public async changeStatus(
    orderId: string,
    status: number
  ): Promise<UpdateResult> {
    return await this.model.updateOne(
      { _id: orderId },
      { $set: { status: status } }
    );
  }

  public async getOpenOrders(): Promise<Array<Order>> {
    const closedOrderStatus = 0;

    return await this.model
      .find({
        status: { $ne: closedOrderStatus },
      })
      .select(
        "_id created_at totalValue address adressNumber neighborhood complement status client paymentMethod"
      )
      .sort({ created_at: "desc" });
  }

  public async getOrderById(orderId: string): Promise<Order> {
    return await this.model.findOne({ _id: orderId });
  }

  public async getOrderByDate(start: Date, end: Date): Promise<Array<Order>> {
    return await this.model.find({
      $and: [
        { status: 0 },
        { created_at: { $gte: start } },
        { created_at: { $lte: end } },
      ],
    });
  }
}

export { OrderRepository };
