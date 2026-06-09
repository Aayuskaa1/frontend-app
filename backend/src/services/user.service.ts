import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { HttpException } from "../exceptions/http-exception";
import { IUserRepository } from "../repositories/user.repository";
import { SECRET_KEY } from "../configs/constant";
import { z } from "zod";
import { CreateUserDTO, LoginUserDTO } from "../dtos/user.dto";

type CreateUserInput = z.infer<typeof CreateUserDTO>;
type LoginUserInput = z.infer<typeof LoginUserDTO>;

export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async createUser(input: CreateUserInput) {
    const existingEmail = await this.userRepository.findByEmail(input.email);
    if (existingEmail) {
      throw new HttpException(409, "Email already in use");
    }

    const existingUsername = await this.userRepository.findByUsername(
      input.username
    );
    if (existingUsername) {
      throw new HttpException(409, "Username already in use");
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);

    const user = await this.userRepository.create({
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      username: input.username,
      password: hashedPassword,
      role: "user",
    });

    const { password: _, ...userWithoutPassword } = user.toObject();

    return userWithoutPassword;
  }

  async loginUser(input: LoginUserInput) {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) {
      throw new HttpException(401, "Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(input.password, user.password);
    if (!isPasswordValid) {
      throw new HttpException(401, "Invalid email or password");
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: "30d" }
    );

    const { password: _, ...userWithoutPassword } = user.toObject();

    return {
      token,
      user: userWithoutPassword,
    };
  }
}
