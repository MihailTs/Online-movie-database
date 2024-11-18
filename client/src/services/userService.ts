import { http } from "./http";

export interface UserCreationData {
  name: string,
  email: string,
  password: string
}

export interface UserModel {
  name: string,
  email: string
}

class UserService {
      
  async create(body: UserCreationData) {
    const { result } = await http.post<UserModel>('/auth/register', { body: body as Record<string, any>});

    return result
  }
  
}

export const userService = new UserService();