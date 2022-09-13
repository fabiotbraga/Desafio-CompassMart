/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import { NoTokenProvided, TokenInvalid } from "../errors/userErrors";
import jwt from "jsonwebtoken";

export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).send({ Error: new NoTokenProvided() });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  jwt.verify(token, process.env.JWT_KEY, (error: any, _decoded: any) => {
    if (error) return res.status(401).send({ Error: new TokenInvalid() });
    return next();
  });
};
