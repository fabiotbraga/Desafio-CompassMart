import { Request, Response, NextFunction } from 'express'
import { NoTokenProvided, TokenInvalid} from '../errors/userErrors'
import jwt from 'jsonwebtoken'

export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.status(401).send({ Error: new NoTokenProvided()});

  jwt.verify(token, process.env.JWT_KEY, (error: any, decoded: any) => {
    if (error) return res.status(401).send({ Error: new TokenInvalid()});
    return next();
}
)};