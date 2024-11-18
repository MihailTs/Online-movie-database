import { jwtDecode } from 'jwt-decode';
import { LocalStorageService } from './localStorage';

export interface User {
  firstName: string;
  id: number;
}

type AuthHandler = (user: User | undefined) => void;

class UserInfoService {
  private handler: AuthHandler | null = null;

  private storage: LocalStorageService<string>;

  constructor() {
    this.storage = new LocalStorageService('movies-library-auth-token');
  }

  setHandler(handler: AuthHandler | null) {
    this.handler = handler;
  }

  save(token: string) {
    const user = this.getUserFromToken(token);

    this.handler?.(user);
    this.storage.set(token);
  }

  clear() {
    this.handler?.(undefined);
    this.storage.clear();
  }

  get initialUser() {
    const token = this.storage.get();

    if (!token) {
      return undefined;
    }

    return this.getUserFromToken(token);
  }

  private getUserFromToken(token: string): User {
    const decoded = jwtDecode(token) as {
      firstName: string;
      userId: number;
    };

    return { firstName: decoded.firstName, id: decoded.userId };
  }

  get authToken() {
    return this.storage.get();
  }

}

export const userInfoService = new UserInfoService();
