import { Model } from "mongoose";
import { UsersModel } from "../database/schemas/UserSchema";
import { User } from "../models/User";
import { InterfaceUserSignUp } from "../Interfaces/UserInterface";

class UserRepository {
  private model: Model<User>;
  public constructor() {
    this.model = UsersModel;
  }

  public async create(user: InterfaceUserSignUp): Promise<any> {
    return await this.model.create(user);
  }

  public async findUserByEmailSignUp(email: string): Promise<any> {
    return await this.model.findOne({ email: email }).select("+password");
  }

  public async findAll(): Promise<any> {
    return await this.model.find().select("-password");
  }
}

export { UserRepository };
