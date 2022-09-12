import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      department: Joi.string().required(),
      brand: Joi.string().required(),
      price: Joi.number().required().min(0.01).max(1000),
      qtd_stock: Joi.number().required().min(1).max(100000),
      bar_codes: Joi.string().length(13).pattern(/^[0-9]+$/).required(),
    });

    const { error } = await schema.validate(req.body, { abortEarly: true });
    if (error) {
      return res.status(400).json({
        message: 'Validation Error',
        description: error.details.map((description) => (description.message))
      });
    }
    return next();
  } catch (Error) {
    return res.status(400).json(Error);
  }
};