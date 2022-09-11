import { Types } from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { IdInvalidError } from '../../errors/productErrors';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const isValid = Types.ObjectId.isValid(id);
    if (!isValid) throw new IdInvalidError();
    return next();
  } catch (error) {
    return res.status(404).json(error);
  }
};