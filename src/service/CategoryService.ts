import { DeleteResult } from "mongodb";
import { InterfaceCategoryCreate } from "../Interfaces/CategoryInterface";
import { CategoryRepository } from "../repository/CategoryRepository";
import { Category } from "../models/Category";
import { ItemRepository } from "../repository/ItemRepository";

class CategoryService {
  private categoryRepository: CategoryRepository;
  private itemRepository: ItemRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository();
    this.itemRepository = new ItemRepository();
  }

  public async create(category: InterfaceCategoryCreate) {
    if (await this.categoryRepository.getByName(category.name)) {
      return { error: "Category already registered" };
    }

    return await this.categoryRepository.create(category);
  }

  public async delete(categoryId: string): Promise<DeleteResult> {
    const category = await this.categoryRepository.getById(categoryId);

    if (category) {
      await this.itemRepository.deleteByCategory(category.name.toString());
    }

    return await this.categoryRepository.delete(categoryId);
  }

  public async getAll(): Promise<Array<Category>> {
    return await this.categoryRepository.getAll();
  }
}

export { CategoryService };
