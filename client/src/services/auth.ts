import { jwtDecode } from 'jwt-decode';
import { AuthorizationError, http } from './http';
import { userInfoService } from './userInfo';

export interface User {
  email: string;
  id: number;
}

interface LoginAttributes {
  email: string;
  password: string;
}

type AuthHandler = (user: User | null) => void;

class AuthService {
  private token: string | null = null;
  private handler: AuthHandler | null = null;

  setHandler(handler: AuthHandler | null) {
    this.handler = handler;
  }

  async login({ email, password }: LoginAttributes) {
    const { headers } = await http.post('/auth/login', {
      body: {
        email,
        password,
      },
    });
  
    const token = headers.get('Authorization');
  
    if (!token) {
      throw new AuthorizationError();
    }
  
    userInfoService.save(token);
  }

  logout() {
    userInfoService.clear();
  }

  get initialUser() {
    const token = localStorage.getItem('movies-library-auth-token');

    if (!token) {
      return null;
    }

    const decoded = jwtDecode(token) as { email: string; userId: number };

    const user = { email: decoded.email, id: decoded.userId };

    return user;
  }

  get authToken() {
    return this.token;
  }
}

export const authService = new AuthService();
