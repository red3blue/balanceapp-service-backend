import { UserDto } from "../models/DTO/UserDto";
import { ServiceResult } from "../response/ServiceResult";
export interface IUserService {
  getAll(): Promise<ServiceResult>;
  createAsync(userDto: UserDto): Promise<ServiceResult>;
  loginAsync(userDto: UserDto): Promise<ServiceResult>;
}
