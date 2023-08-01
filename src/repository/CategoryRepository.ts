import { Model } from "mongoose";
import { CategoryModel } from "../database/schemas/CategorySchema";
import { Category } from "../models/Category";
import { InterfaceCategoryCreate } from "../Interfaces/CategoryInterface";
import { DeleteResult } from "mongodb";

class CategoryRepository {
  private model: Model<Category>;
  constructor() {
    this.model = CategoryModel;
  }

  public async create(category: InterfaceCategoryCreate) {
    return await this.model.create(category);
  }

  public async delete(categoryId: string): Promise<DeleteResult> {
    return await this.model.deleteOne({ _id: categoryId });
  }

  public async getAll(): Promise<Array<Category>> {
    return await this.model.find({}).sort({ name: "asc" });
  }

  public async getByName(category: string): Promise<Category> {
    return await this.model.findOne({
      name: { $regex: category, $options: "i" },
    });
  }
}

export { CategoryRepository };
