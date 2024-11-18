import jwt from 'jsonwebtoken';
import { config } from '../config';

export interface JWTPayload {
  userId: number,
  firstName: string | undefined
}

class JWTService {
  create(payload: JWTPayload): string {
    return jwt.sign(payload, config.get('jwtSecret'), { expiresIn: '1h' })
  }

  parse(token: string): JWTPayload {
    return jwt.verify(token, config.get('jwtSecret')) as JWTPayload
  }
}

export const jwtService = new JWTService()
