import { Router } from "express";
import { Request, Response } from "express";
import { CategoryService } from "../service/CategoryService";
import { CategoryValidations } from "../validations/CategoryValidations";
import { InterfaceCategoryCreate } from "../Interfaces/CategoryInterface";

const router = Router();

class CategoryController {
  private router: Router;
  private authMiddleware: any;
  private categoryService: CategoryService;
  private categoryValidations: CategoryValidations;
  constructor(router: Router) {
    this.router = router;
    this.authMiddleware = require("../middlewares/auth");
    this.categoryService = new CategoryService();
    this.categoryValidations = new CategoryValidations();
  }

  getRouter(): Router {
    return this.router;
  }

  useRoutes(): void {
    this.router.post("/create", async (req: any, res: Response) => {
      try {
        this.authMiddleware(req, res);
        if (req.userId) {
          const categoryData: InterfaceCategoryCreate = req.body;

          const validation =
            this.categoryValidations.validateCategory(categoryData);

          if (validation.error) {
            return res.status(400).send({ error: validation.error.message });
          }

          const newCategory = await this.categoryService.create(categoryData);
          return res.status(200).send(newCategory);
        }
      } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Internal Server Error" });
      }
    });

    this.router.delete(
      "/delete/:categoryId",
      async (req: any, res: Response) => {
        try {
          this.authMiddleware(req, res);
          if (req.userId) {
            const categoryId = req.params.categoryId;

            if (!categoryId) {
              return res.status(400).send({ error: "categoryId is required" });
            }

            const deleteCategory = await this.categoryService.delete(
              categoryId
            );

            if (deleteCategory.deletedCount > 0) {
              return res
                .status(200)
                .send({ success: "Category successfully deleted" });
            }

            return res.status(400).send({ error: "Category not found" });
          }
        } catch (error) {
          console.log(error);
          return res.status(500).send({ error: "Internal Server Error" });
        }
      }
    );

    this.router.get("/getall", async (req: any, res: Response) => {
      try {
        this.authMiddleware(req, res);
        if (req.userId) {
          const categories = await this.categoryService.getAll();
          return res.status(200).send(categories);
        }
      } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Internal Server Error" });
      }
    });
  }
}

const routes = new CategoryController(router);
routes.useRoutes();
const categoryControllerRoutes = routes.getRouter();
export { categoryControllerRoutes };
