import {
  InterfaceOrderByDate,
  InterfaceOrderClientCreate,
} from "../Interfaces/OrderInterface";
import { Additional } from "../models/Additional";
import { Order } from "../models/Order";
import { OrderItem } from "../models/OrderItem";
import { ItemRepository } from "../repository/ItemRepository";
import { OrderRepository } from "../repository/OrderRepository";
const moment = require("moment-timezone");
class OrderService {
  private orderRepository: OrderRepository;
  private itemRepository: ItemRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
    this.itemRepository = new ItemRepository();
  }

  public async create(order: InterfaceOrderClientCreate) {
    let orderTotalValue = 0;

    const orderCode = 0;
    const orderStatus = 1;
    const orderItems = [];

    const newOrder = new Order(
      orderStatus,
      orderTotalValue,
      orderCode,
      order.client,
      order.paymentMethod,
      order.address,
      order.adressNumber,
      order.complement,
      order.neighborhood,
      order.phoneNumber,
      orderItems,
      moment(Date.now()).utc(0),
      order.observations ?? ""
    );

    await Promise.all(
      order.items.map(async (clientItem, index) => {
        let orderAdditionalsTotalPrice = 0;
        const itemInDB = await this.itemRepository.getById(clientItem.itemId);

        if (itemInDB) {
          let itemAdditionals: Array<Additional> = itemInDB.additional.filter(
            (additional) => clientItem.additionalCodes.includes(additional.code)
          );

          itemAdditionals.map((additional) => {
            orderAdditionalsTotalPrice =
              orderAdditionalsTotalPrice + additional.value;
          });

          orderTotalValue +=
            (itemInDB.value + orderAdditionalsTotalPrice) * clientItem.amount;
          itemInDB.additional = itemAdditionals;

          const newOrderItem = new OrderItem(
            itemInDB.name,
            itemInDB.value,
            itemInDB.description,
            itemInDB.additional,
            itemInDB.category,
            itemInDB.created_at,
            clientItem.amount
          );

          newOrder.items.push(newOrderItem);
        }
      })
    );

    newOrder.totalValue = orderTotalValue;
    return await this.orderRepository.create(newOrder);
  }

  public async changeStatus(orderId: string, status: number) {
    return await this.orderRepository.changeStatus(orderId, status);
  }

  public async getOpenOrders(): Promise<Array<Order>> {
    return await this.orderRepository.getOpenOrders();
  }
  public async getOrderById(orderId: string): Promise<Order> {
    return await this.orderRepository.getOrderById(orderId);
  }

  public async getOrderByDate(params: InterfaceOrderByDate, page: number) {
    const start = moment(params.start).utc(0);
    const end = moment(params.end).utc(0);
    return await this.orderRepository.getOrderByDate(start, end, page);
  }
}

export { OrderService };
