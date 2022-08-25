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
      title: Joi.string(),
      description: Joi.string(),
      departament: Joi.string(),
      brand: Joi.string(),
      price: Joi.number().min(0.01).max(1000),
      qtd_stock: Joi.number().max(100000),
    });

    const { error } = await schema.validate(req.body, { abortEarly: true });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json(error);
  }
};