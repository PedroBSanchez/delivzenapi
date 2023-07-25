import Joi from "joi";
import {
  InterfaceOrderByDate,
  InterfaceOrderClientCreate,
} from "../Interfaces/OrderInterface";

class OrderValidations {
  public validateClientOrder(order: InterfaceOrderClientCreate) {
    let {
      client,
      address,
      adressNumber,
      paymentMethod,
      complement,
      neighborhood,
      phoneNumber,
      items,
    } = order;

    const schema = Joi.object({
      client: Joi.string().min(0).required(),
      address: Joi.string().min(0).required(),
      adressNumber: Joi.string().min(0).required(),
      paymentMethod: Joi.string().min(0).required(),
      complement: Joi.string().min(0).required(),
      neighborhood: Joi.string().min(0).required(),
      phoneNumber: Joi.string().min(0).required(),
      items: Joi.array().min(1).required(),
    });

    return schema.validate({
      client,
      address,
      adressNumber,
      paymentMethod,
      complement,
      neighborhood,
      phoneNumber,
      items,
    });
  }

  public validateChangeStatus(orderId: string, status: number): any {
    if (!orderId) {
      return { error: { message: "orderId is required" } };
    }

    const isStatusValid = status == 0 || status == 1 || status == 2;

    if (!isStatusValid) {
      return {
        error: { message: "Invalid status" },
      };
    }

    return true;
  }

  public validateOrderByDate(params: InterfaceOrderByDate) {
    let { start, end } = params;

    const schema = Joi.object({
      start: Joi.date().required(),
      end: Joi.date().required(),
    });

    return schema.validate({ start, end });
  }
}

export { OrderValidations };
