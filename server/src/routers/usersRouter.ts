import { Router } from "express";
import { jwtService } from '../services/JWTService';
import { userService } from "../services/UserService";
import { BadRequestError, UnauthorizedUserError } from '../errors';
import { errorHandler } from "../middlewares/errorHandler";
import { userTransformer } from "../models/transformers/userTransformer";
import { loginInputSchema, registerInputSchema } from "../models/user";

const authRouter = Router();

authRouter.post('/register',
  errorHandler( async (req, res) => {
  const input = registerInputSchema.parse(req.body);

  if ((await userService.findByEmail({ email: input.email })) !== undefined) {
    throw new BadRequestError('Email already taken');
  }

  if ((await userService.findByName({ name: input.name })) !== undefined) {
    throw new BadRequestError('Username already taken');
  }

  const user = await userService.register(input);

  return userTransformer.transform(user);
}));

authRouter.post(
  '/login',
  errorHandler(async (req, res) => {
    const input = loginInputSchema.parse(req.body);

    const user = await userService.login(input);
    if (!user) {
      throw new UnauthorizedUserError('Unauthorized');
    }

    const token = jwtService.create({
      userId: user.id,
      firstName: user.name
    });

    res?.setHeader('Authorization', `Bearer ${token}`);
    return userTransformer.transform(user);
  })
);

export { authRouter };
