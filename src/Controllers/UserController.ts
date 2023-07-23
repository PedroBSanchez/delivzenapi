import { Router } from "express";
import { Request, Response } from "express";
import {
  InterfaceUserLogin,
  InterfaceUserSignUp,
} from "../Interfaces/UserInterface";
import { UserService } from "../service/UserService";

const router = Router();

class UserController {
  private router: Router;
  private userService: UserService;
  private authMiddleware: any;

  constructor(router: Router) {
    this.router = router;
    this.userService = new UserService();
    this.authMiddleware = require("../middlewares/auth");
  }

  getRouter(): Router {
    return this.router;
  }

  useRoutes(): void {
    this.router.post("/login", async (req: Request, res: Response) => {
      const loginData: InterfaceUserLogin = req.body;
      const login = await this.userService.login(loginData);

      if (login.error) {
        return res.status(400).json(login.error);
      }

      login.user.password = undefined;

      return res.status(200).json(login);
    });

    this.router.post("/signup", async (req: Request, res: Response) => {
      const signupData: InterfaceUserSignUp = req.body;
      const createNewUser = await this.userService.create(signupData);

      if (createNewUser.error) return res.status(400).send(createNewUser.error);

      createNewUser.password = undefined;
      console.log(createNewUser);

      return res.status(200).send(createNewUser);
    });

    this.router.get("/getall", async (req: any, res: Response) => {
      try {
        this.authMiddleware(req, res);
        if (req.userId) {
          const users = await this.userService.getAll();

          if (users.error) {
            return res.status(400).send(users);
          }

          return res.status(200).send(users);
        }
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    });
  }
}

const routes = new UserController(router);
routes.useRoutes();
const userControllerRoutes = routes.getRouter();

export { userControllerRoutes };
