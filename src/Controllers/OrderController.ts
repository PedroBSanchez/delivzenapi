import { Router } from "express";
import { Request, Response } from "express";
import { OrderService } from "../service/OrderService";
import {
  InterfaceOrderByDate,
  InterfaceOrderClientCreate,
} from "../Interfaces/OrderInterface";
import { OrderValidations } from "../validations/OrderValidations";

const router = Router();

class OrderController {
  private router: Router;
  private authMiddleware: any;
  private orderService: OrderService;
  private orderValidations: OrderValidations;

  constructor(router: Router) {
    this.router = router;
    this.authMiddleware = require("../middlewares/auth");
    this.orderService = new OrderService();
    this.orderValidations = new OrderValidations();
  }

  getRouter(): Router {
    return this.router;
  }

  useRoutes(): void {
    this.router.post("/create", async (req: any, res: Response) => {
      try {
        const clientOrderData: InterfaceOrderClientCreate = req.body;

        const validation =
          this.orderValidations.validateClientOrder(clientOrderData);

        if (validation.error) {
          return res.status(400).send({ error: validation.error.message });
        }

        const newOrder = await this.orderService.create(clientOrderData);

        return res.status(200).send(newOrder);
      } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Internal Server Error" });
      }
    });

    this.router.put(
      "/changestatus/:orderId/:status",
      async (req: any, res: Response) => {
        try {
          this.authMiddleware(req, res);
          if (req.userId) {
            const orderId = req.params.orderId;
            const status = req.params.status;

            const validation = this.orderValidations.validateChangeStatus(
              orderId,
              status
            );

            if (validation.error) {
              return res.status(400).send({ error: validation.error.message });
            }

            const changeStatus = await this.orderService.changeStatus(
              orderId,
              status
            );

            if (changeStatus.modifiedCount > 0) {
              return res
                .status(200)
                .send({ success: "Order status changed successfully" });
            }

            return res.status(400).send({ error: "Order not found" });
          }
        } catch (error) {
          console.log(error);
          return res.status(500).send({ error: "Internal Server Error" });
        }
      }
    );

    this.router.get(
      "/getorderbyid/:orderId",
      async (req: any, res: Response) => {
        try {
          this.authMiddleware(req, res);
          if (req.userId) {
            const orderId = req.params.orderId;

            if (!orderId) {
              return res.status(400).send({ error: "orderId is required" });
            }
            const order = await this.orderService.getOrderById(orderId);
            if (!order) {
              return res.status(400).send({ error: "Order not found" });
            }
            return res.status(200).send(order);
          }
        } catch (error) {
          console.log(error);
          return res.status(500).send({ error: "Internal Server Error" });
        }
      }
    );

    this.router.get("/getopenorders", async (req: any, res: Response) => {
      try {
        this.authMiddleware(req, res);
        if (req.userId) {
          const orders = await this.orderService.getOpenOrders();
          return res.status(200).send(orders);
        }
      } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Internal Server Error" });
      }
    });

    this.router.post("/getordersbydate", async (req: any, res: Response) => {
      try {
        this.authMiddleware(req, res);
        if (req.userId) {
          const getOrdersByDateData: InterfaceOrderByDate = req.body;
          const validation =
            this.orderValidations.validateOrderByDate(getOrdersByDateData);

          if (validation.error) {
            return res.status(400).send({ error: validation.error.message });
          }

          const orders = await this.orderService.getOrderByDate(
            getOrdersByDateData
          );

          return res.status(200).send(orders);
        }
      } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Internal Server Error" });
      }
    });
  }
}

const routes = new OrderController(router);
routes.useRoutes();
const orderControllerRoutes = routes.getRouter();

export { orderControllerRoutes };
