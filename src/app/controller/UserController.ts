import UserService from "../services/UserService";
import { Request, Response } from "express";
import {
  EmailExistsError,
  PasswordInvalid,
  UserNotFound
} from "../errors/userErrors";
class UserController {
  async create(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await UserService.create({ email, password });
      res.status(201).json(result);
    } catch (Error) {
      if (Error instanceof EmailExistsError)
        return res.status(Error.statusCode).json({ Error });
      return res.status(500).json(Error);
    }
  }

  async authenticate(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await UserService.authenticate({ email, password });
      res.status(200).json(result);
    } catch (Error) {
      if (Error instanceof UserNotFound)
        return res.status(Error.statusCode).json({ Error });
      if (Error instanceof PasswordInvalid)
        return res.status(Error.statusCode).json({ Error });
      return res.status(500).json(Error);
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const result = await UserService.findAll();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default new UserController();
