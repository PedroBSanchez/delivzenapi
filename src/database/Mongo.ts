import mongoose, { mongo } from "mongoose";
import { config } from "dotenv";

export const connectToDatabase = async (): Promise<any> => {
  const mongo_url = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongo:27017`;
  //const mongo_url = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@localhost:27017`;

  mongoose.connect(mongo_url);

  mongoose.connection.on("error", (error) =>
    console.error("🖳 - Error on connect to database: " + error)
  );
  mongoose.connection.once("open", () =>
    console.log("🖳 - MongoDB successfully connected!")
  );

  return mongoose.connection;
};
