import { config } from "dotenv";
import express from "express";
import cors from "cors";
import { userControllerRoutes } from "./Controllers/UserController";
import { itemControllerRoutes } from "./Controllers/ItemController";
import { connectToDatabase } from "./database/Mongo";
import { categoryControllerRoutes } from "./Controllers/CategoryController";
import { orderControllerRoutes } from "./Controllers/OrderController";

const main = async () => {
  config();
  const app = express();

  const corsOptions = {
    origin: [
      process.env.CLIENT_URL,
      process.env.MANAGER_URL
    ],
  };
  
  app.use(cors(corsOptions));
  app.use(express.json());

  // Routes //

  app.use("/api/users", userControllerRoutes);
  app.use("/api/items", itemControllerRoutes);
  app.use("/api/categories", categoryControllerRoutes);
  app.use("/api/orders", orderControllerRoutes);

  ////////////

  const port = process.env.PORT || 8080;

  await connectToDatabase();
  app.listen(port, () => console.log("🖳 - Server up on PORT: " + port));
};

main();
