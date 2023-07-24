import { DeleteResult, UpdateResult } from "mongodb";
import { InterfaceItemCreate } from "../Interfaces/ItemInterface";
import { ItemRepository } from "../repository/ItemRepository";
import { Item } from "../models/Item";
import { CategoryRepository } from "../repository/CategoryRepository";

class ItemService {
  private itemRepository: ItemRepository;
  private categoryRepository: CategoryRepository;

  constructor() {
    this.itemRepository = new ItemRepository();
    this.categoryRepository = new CategoryRepository();
  }

  public async create(item: InterfaceItemCreate) {
    return await this.itemRepository.create(item);
  }

  public async update(
    itemId: string,
    item: InterfaceItemCreate
  ): Promise<UpdateResult> {
    return await this.itemRepository.update(itemId, item);
  }

  public async delete(itemId: string): Promise<DeleteResult> {
    return await this.itemRepository.delete(itemId);
  }

  public async getAll(): Promise<Array<Item>> {
    return await this.itemRepository.getAll();
  }

  public async getMenu() {
    const categories = await this.categoryRepository.getAll();

    const menu = [];

    await Promise.all(
      categories.map(async (category) => {
        const itemsByCategory = await this.itemRepository.listByCategory(
          category.name.toString()
        );

        if (itemsByCategory.length > 0) {
          menu.push({
            category: category.name.toString(),
            items: itemsByCategory,
          });
        }
      })
    );

    return menu;
  }

  public async getById(itemId: string): Promise<Item> {
    return await this.itemRepository.getById(itemId);
  }
}

export { ItemService };
