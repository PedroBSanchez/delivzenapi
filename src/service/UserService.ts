import {
  InterfaceUserLogin,
  InterfaceUserSignUp,
} from "../Interfaces/UserInterface";
import Bcrypt from "bcryptjs";
import Jwt, { verify } from "jsonwebtoken";
import { UserRepository } from "../repository/UserRepository";

class UserService {
  private userRepository: UserRepository;

  public constructor() {
    this.userRepository = new UserRepository();
  }

  public async create(createUser: InterfaceUserSignUp): Promise<any> {
    const user = await this.userRepository.findUserByEmailSignUp(
      createUser.email
    );
    if (user) return { error: "User already exists" };
    const newUser = await this.userRepository.create(createUser);
    return newUser;
  }

  public async login(login: InterfaceUserLogin): Promise<any> {
    const user = await this.userRepository.findUserByEmailSignUp(login.email);
    if (!user) {
      return { error: "User not found" };
    }

    if (!(await Bcrypt.compare(login.password, user.password))) {
      return { error: "Invalid password" };
    }
    // Gerar token
    return { user, token: this.generateToken({ id: user.id }) };
  }

  public async getAll(): Promise<any> {
    const users = await this.userRepository.findAll();

    if (!users || users.length <= 0) {
      return { error: "Users not found" };
    }

    return users;
  }

  private generateToken(params = {}) {
    const secret: any = process.env.JWT_SECRET;
    return Jwt.sign({ id: params }, secret, {
      expiresIn: 3600,
    });
  }
}

export { UserService };
