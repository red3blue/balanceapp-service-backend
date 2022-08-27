import { UserDto } from "../models/DTO/UserDto";
import { ServiceResult } from "../response/ServiceResult";
export interface IUserService {
  createAsync(userDto: UserDto): Promise<ServiceResult>;
  loginAsync(userDto: UserDto): Promise<ServiceResult>;
}
