import Joi from "joi";
import { InterfaceItemCreate } from "../Interfaces/ItemInterface";

class ItemValidations {
  public validateItem(item: InterfaceItemCreate) {
    let { value, name, description, additional, category } = item;

    if (!additional) {
      additional = [];
    }

    if (additional.length > 0) {
      for (const element of additional) {
        if (!element.name) {
          return { error: { message: "Additional name is required" } };
        } else if (!element.value || element.value <= 0) {
          return {
            error: {
              message:
                "Additional value is required and must be greater then zero",
            },
          };
        }
      }
    }
    const schema = Joi.object({
      value: Joi.number().min(0).required(),
      name: Joi.string().min(1).required(),
      category: Joi.string().min(1).required(),
    });

    return schema.validate({ value, name, category });
  }
}

export { ItemValidations };
