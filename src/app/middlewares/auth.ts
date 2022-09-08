import { Request, Response, NextFunction } from 'express'
import jtw from 'jsonwebtoken'
import NoToken from '../errors/NoToken';
import tokenInvalid from '../errors/TokenInvalid'
import tokenMalformatted from '../errors/TokenInvalid';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send({ error: NoToken });
    const parts = authHeader.split(' ');
    if (!(parts.length === 2)) return res.status(401).send({ error: tokenInvalid });
    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) return res.status(401).send({ error: tokenMalformatted });
    jtw.verify(token, process.env.JWT_KEY, (error, decoded) => {
      if (error) return res.status(401).send({ error: tokenInvalid });
      return next();
    })
  } catch (error) {
    return res.status(500).json({ error });
  }
}