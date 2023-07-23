import { config } from "dotenv";
import express from "express";
import cors from "cors";
import { userControllerRoutes } from "./Controllers/UserController";
import { connectToDatabase } from "./database/Mongo";

const main = async () => {
  config();
  const app = express();
  app.use(cors());
  app.use(express.json());

  // Routes //

  app.use("/api/users", userControllerRoutes);

  ////////////

  const port = process.env.PORT || 8080;

  await connectToDatabase();
  app.listen(port, () => console.log("🖳 - Server up on PORT: " + port));
};

main();
