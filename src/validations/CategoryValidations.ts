import Joi from "joi";
import { InterfaceCategoryCreate } from "../Interfaces/CategoryInterface";

class CategoryValidations {
  public validateCategory(category: InterfaceCategoryCreate) {
    let { name } = category;

    const schema = Joi.object({
      name: Joi.string().min(1).required(),
    });

    return schema.validate({ name });
  }
}

export { CategoryValidations };
