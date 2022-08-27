import { User } from "../entities/User";

export interface IUserRepository {
  validateAuthorization(authorization: string);
  createAsync(user: User): Promise<User | null>;
  loginAsync(user: User): Promise<User | null>;
}
