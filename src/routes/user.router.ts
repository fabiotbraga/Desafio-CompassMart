import { Router } from "express";
import UserController from "../app/controller/UserController";
import userValidation from "../app/validations/User/userValidation";

const router = Router();
const mainRoute = "/api/v1/user";

router.post(`${mainRoute}`, userValidation, UserController.create);
router.post(
  `${mainRoute}/authenticate`,
  userValidation,
  UserController.authenticate
);
router.get(`${mainRoute}`, UserController.findAll);
export default router;
