import { Request, Response, NextFunction } from 'express'
import jtw from 'jsonwebtoken'
import { NoTokenProvided, TokenInvalid, BadFormattedToken} from '../errors/userErrors'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send({ error: NoTokenProvided });
    const parts = authHeader.split(' ');
    if (!(parts.length === 2)) return res.status(401).send({ error: TokenInvalid });
    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) return res.status(401).send({ error: BadFormattedToken });
    jtw.verify(token, process.env.JWT_KEY, (error, decoded) => {
      if (error) return res.status(401).send({ error: TokenInvalid });
      return next();
    })
  } catch (error) {
    return res.status(500).json({ error });
  }
}