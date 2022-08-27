import { User } from "../entities/User";

export interface IUserRepository {
  createAsync(user: User): Promise<User | null>;
  loginAsync(user: User): Promise<User | null>;
}
