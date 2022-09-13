import { Types } from "mongoose";
import { IdInvalidError } from "../../errors/productErrors";
import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const isValid = Types.ObjectId.isValid(id);
    if (!isValid) throw new IdInvalidError();

    const schema = Joi.object({
      title: Joi.string().trim(),
      description: Joi.string().trim(),
      department: Joi.string().trim(),
      brand: Joi.string().trim(),
      price: Joi.number().min(0.01).max(1000),
      qtd_stock: Joi.number().max(100000)
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
    if (Error instanceof IdInvalidError)
      return res.status(Error.statusCode).json({ Error });
    return res.status(400).json(Error);
  }
};
