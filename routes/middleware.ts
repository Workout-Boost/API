import { Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
const { appSecret } = require('../config/keys');
const secret = appSecret;

export const withAuth = function(req: any, res: Response, next: NextFunction) {
  const token: string = req.query.token;

  if (!token) {
    res.status(401).send('Unauthorized: You are not logged in');
  } else {
    jwt.verify(token, secret, function(err: any, decoded: any) {
      if (err) {
        res.status(403).send('Unauthorized: Your session has expired');
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
}

export const isAdmin = function(req: any, res: Response, next: NextFunction) {
  const token: string = req.query.token;

  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, function(err: any, decoded: any) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        if (decoded.id === '6046ff329c648230431fd533' || "6046d11821607e1a173cd08e" || "604aeab64fcadd001c4ad57e") {
          req.email = decoded.email;
          next();
        }
      }
    });
  }
}