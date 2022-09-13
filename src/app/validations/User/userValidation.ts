import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().trim().required(),
      password: Joi.string().trim().required()
    });
    const { error } = await schema.validate(req.body, { abortEarly: true });
    if (error) {
      return res.status(400).json({
        message: "Validation Error",
        description: error.details.map((description) => description.message)
      });
    }
    return next();
  } catch (Error) {
    return res.status(400).json(Error);
  }
};
