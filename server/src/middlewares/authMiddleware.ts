import { Request, Response, NextFunction } from "express";
import { TokenExpiredError } from 'jsonwebtoken';
import { userService } from "../services/UserService";
import { JWTPayload, jwtService } from "../services/JWTService";

export const authMiddleware = async (req: Request, 
    res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;
  
    if (!authorization?.startsWith('Bearer ')) {
      return res.status(403).send({ message: 'Invalid token' });
    }
  
    const token = authorization.replace('Bearer ', '');
  
    let decoded: JWTPayload | undefined;
    try {
      decoded = jwtService.parse(token);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return res.status(401).send({ message: 'Token has expired' });
      }
      return res.status(401).send({ message: 'Unauthorized' });
    }
  
    if (!decoded || !decoded.userId) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
  
    const user = await userService.findById({userId: decoded.userId});
    if (!user) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
  
    res.locals.user = user;
    next();
  };
  