import { Types } from "mongoose";
import { Request, Response, NextFunction } from "express";
import { IdInvalidError } from "../../errors/productErrors";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const isValid = Types.ObjectId.isValid(id);
    if (!isValid) throw new IdInvalidError();
    return next();
  } catch (Error) {
    if (Error instanceof IdInvalidError)
      return res.status(Error.statusCode).json({ Error });
    return res.status(400).json(Error);
  }
};
