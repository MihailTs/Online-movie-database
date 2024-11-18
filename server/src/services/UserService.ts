import { UniqueViolationError } from 'objection';
import { GetUserByEmail, GetUserById, GetUserByName, LoginIput, RegisterInput, User } from '../models/user';
import bcrypt from 'bcrypt';

const HASH_SALT = 10;

export class UserService {
    /**
     * Creates a new user
     *
     * Throws an error if the email already exists.
     */

    async register(input: RegisterInput): Promise<User> {
        try {    
          const passwordHash = await bcrypt.hash(input.password, HASH_SALT);
          const newUser = await User.query().insert({
              name: input.name,
              email: input.email,
              password: passwordHash
          });
          return newUser;
        } catch (error) {
          if (error instanceof UniqueViolationError) {
            console.error(`User with the given email already exists: ${error.message}`);
          }
          throw error;
        }    
    }
  
    /**
     * Finds a user by email
     *
     * Returns `undefined` if a user with this email does not exist.
     */
    async findByEmail(input: GetUserByEmail): Promise<User | undefined> {
      const user = await User.query()
        .where('email', '=', input.email)
        .findOne(true);

      return user;
    }

    /**
     * Finds a user by id
     *
     * Returns `undefined` if a user with this id does not exist.
     */
    async findById(input: GetUserById): Promise<User | undefined> {
      const user = await User.query()
        .where('id', '=', input.userId)
        .findOne(true);

      return user;
    }

    async findByName(input: GetUserByName): Promise<User | undefined> {
      const user = await User.query()
        .where('name', '=', input.name)
        .findOne(true);

      return user;
    }

    async login(input: LoginIput): Promise<User | undefined> {
      const user = await this.findByEmail({ email: input.email });
  
      if (!user) {
        return undefined;
      }
  
      const isPasswordCorrect = await bcrypt.compare(input.password, user.password);
  
      if (!isPasswordCorrect) {
        return undefined;
      }
  
      return user;
    }
}

export const userService = new UserService();