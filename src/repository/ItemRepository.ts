import { Model } from "mongoose";

import { ItemModel } from "../database/schemas/ItemSchema";
import { Item } from "../models/Item";
import { InterfaceItemCreate } from "../Interfaces/ItemInterface";

import { DeleteResult, UpdateResult } from "mongodb";

class ItemRepository {
  private model: Model<Item>;
  public constructor() {
    this.model = ItemModel;
  }

  public async create(item: InterfaceItemCreate) {
    return await this.model.create(item);
  }

  public async update(
    itemId: string,
    item: InterfaceItemCreate
  ): Promise<UpdateResult> {
    return await this.model.updateOne(
      { _id: itemId },
      {
        $set: {
          category: item.category,
          name: item.name,
          value: item.value,
          additional: item.additional ?? [],
          description: item.description,
        },
      }
    );
  }

  public async delete(itemId: string): Promise<DeleteResult> {
    return await this.model.deleteOne({ _id: itemId });
  }

  public async getAll(): Promise<Array<Item>> {
    return await this.model.find({});
  }

  public async listByCategory(category: string): Promise<Array<Item>> {
    return await this.model.find({ category: category });
  }

  public async getById(itemId: string): Promise<Item> {
    return await this.model.findOne({ _id: itemId });
  }
}

export { ItemRepository };
