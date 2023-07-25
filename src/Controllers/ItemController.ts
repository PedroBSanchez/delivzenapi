import { Router } from "express";
import { Request, Response } from "express";
import { ItemService } from "../service/ItemService";
import { InterfaceItemCreate } from "../Interfaces/ItemInterface";
import { ItemValidations } from "../validations/ItemValidations";

const router = Router();

class ItemController {
  private router: Router;
  private authMiddleware: any;
  private itemService: ItemService;
  private itemValidations: ItemValidations;

  constructor(router: Router) {
    this.router = router;
    this.authMiddleware = require("../middlewares/auth");
    this.itemService = new ItemService();
    this.itemValidations = new ItemValidations();
  }

  getRouter(): Router {
    return this.router;
  }

  useRoutes(): void {
    this.router.post("/create", async (req: any, res: Response) => {
      try {
        this.authMiddleware(req, res);
        if (req.userId) {
          const newItemData: InterfaceItemCreate = req.body;
          const validation = this.itemValidations.validateItem(newItemData);

          if (validation.error) {
            return res.status(400).send({ error: validation.error.message });
          }

          const newItem = await this.itemService.create(newItemData);
          return res.status(200).send(newItem);
        }
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    });

    this.router.put("/update/:itemId", async (req: any, res: Response) => {
      try {
        this.authMiddleware(req, res);
        if (req.userId) {
          const itemId = req.params.itemId;
          const itemData: InterfaceItemCreate = req.body;

          if (!itemId) {
            return res.status(400).send({ error: "itemId is required" });
          }

          const validation = this.itemValidations.validateItem(itemData);
          if (validation.error) {
            return res.status(400).send({ error: validation.error.message });
          }

          const updateItem = await this.itemService.update(itemId, itemData);

          if (updateItem.matchedCount > 0) {
            return res
              .status(200)
              .send({ success: "Item successfully updated" });
          }
          return res.status(400).send({ error: "Item not found" });
        }
      } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Internal Server Error" });
      }
    });

    this.router.delete("/delete/:itemId", async (req: any, res: Response) => {
      try {
        this.authMiddleware(req, res);
        if (req.userId) {
          const itemId = req.params.itemId;

          if (!itemId) {
            return res.status(400).send({ error: "itemId is required" });
          }

          const deleteItem = await this.itemService.delete(itemId);

          if (deleteItem.deletedCount > 0) {
            return res
              .status(200)
              .send({ success: "Item successfully deleted" });
          }
          return res.status(400).send({ error: "Item not found" });
        }
      } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Internal Server Error" });
      }
    });

    this.router.get("/getall", async (req: any, res: Response) => {
      try {
        this.authMiddleware(req, res);
        if (req.userId) {
          const items = this.itemService.getAll();
          return res.status(200).send(items);
        }
      } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Internal Server Error" });
      }
    });

    this.router.get("/getmenu", async (req: any, res: Response) => {
      try {
        const menu = await this.itemService.getMenu();
        return res.status(200).send(menu);
      } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Internal Server Error" });
      }
    });

    this.router.get("/getbyid/:itemId", async (req: any, res: Response) => {
      try {
        this.authMiddleware(req, res);
        if (req.userId) {
          const itemId = req.params.itemId;
          if (!itemId) {
            return res.status(400).send({ error: "itemId is required" });
          }
          const item = await this.itemService.getById(itemId);
          if (!item) return res.status(400).send({ error: "Item not found" });
          return res.status(200).send(item);
        }
      } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Internal Server Error" });
      }
    });
  }
}

const routes = new ItemController(router);
routes.useRoutes();
const itemControllerRoutes = routes.getRouter();

export { itemControllerRoutes };
