import { Request, Response } from "express";
import { z } from "zod";
import { ApiResponseHelper } from "../utils/apihelper.util";
import { CreateUserDTO, LoginUserDTO } from "../dtos/user.dto";
import { UserService } from "../services/user.service";
import { HttpException } from "../exceptions/http-exception";

export class UserController {
  constructor(private readonly userService: UserService) {}

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = CreateUserDTO.safeParse(req.body);

      if (!result.success) {
        res
          .status(400)
          .json(
            ApiResponseHelper.error(z.prettifyError(result.error), 400)
          );
        return;
      }

      const user = await this.userService.createUser(result.data);

      res
        .status(201)
        .json(ApiResponseHelper.success("User registered successfully", user, 201));
    } catch (error) {
      if (error instanceof HttpException) {
        res
          .status(error.status)
          .json(ApiResponseHelper.error(error.message, error.status));
        return;
      }

      res
        .status(500)
        .json(ApiResponseHelper.error("Internal server error", 500));
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = LoginUserDTO.safeParse(req.body);

      if (!result.success) {
        res
          .status(400)
          .json(
            ApiResponseHelper.error(z.prettifyError(result.error), 400)
          );
        return;
      }

      const data = await this.userService.loginUser(result.data);

      res
        .status(200)
        .json(ApiResponseHelper.success("Login successful", data));
    } catch (error) {
      if (error instanceof HttpException) {
        res
          .status(error.status)
          .json(ApiResponseHelper.error(error.message, error.status));
        return;
      }

      res
        .status(500)
        .json(ApiResponseHelper.error("Internal server error", 500));
    }
  };
}
