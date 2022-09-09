import { Types } from 'mongoose';
import IdProductInvalid from '../../errors/idProductInvalid';
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const isValid = Types.ObjectId.isValid(id);
    if (!isValid) throw new IdProductInvalid();
    
    const schema = Joi.object({
      title: Joi.string().required().trim(),
      description: Joi.string().required().trim(),
      department: Joi.string().required().trim(),
      brand: Joi.string().required().trim(),
      price: Joi.number().required().min(0.01).max(1000),
      qtd_stock: Joi.number().required().max(100000),
    });

    const { error } = await schema.validate(req.body, { abortEarly: true });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json(error);
  }
};