import { Router } from "express";
import { UserMongoRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";

const router = Router();

const userRepository = new UserMongoRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post("/register", userController.register);
router.post("/login", userController.login);

export default router;
