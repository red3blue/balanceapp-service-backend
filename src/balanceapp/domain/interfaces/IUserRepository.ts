import { User } from "../entities/User";

export interface IUserRepository {
  getAll(): Promise<User[] | null>;
  createAsync(user: User): Promise<User | null>;
  loginAsync(user: User): Promise<User | null>;
}
