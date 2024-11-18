import { User } from '../user';

export type TransformedUser = ReturnType<UserTransformer['transform']>;

class UserTransformer {
  transform(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}

export const userTransformer = new UserTransformer();
