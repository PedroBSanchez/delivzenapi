import { DeleteResult } from "mongodb";
import { InterfaceCategoryCreate } from "../Interfaces/CategoryInterface";
import { CategoryRepository } from "../repository/CategoryRepository";
import { Category } from "../models/Category";

class CategoryService {
  private categoryRepository: CategoryRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  public async create(category: InterfaceCategoryCreate) {
    return await this.categoryRepository.create(category);
  }

  public async delete(categoryId: string): Promise<DeleteResult> {
    return await this.categoryRepository.delete(categoryId);
  }

  public async getAll(): Promise<Array<Category>> {
    return await this.categoryRepository.getAll();
  }
}

export { CategoryService };
