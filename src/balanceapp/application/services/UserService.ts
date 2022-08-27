import { Inject, Injectable } from "@nestjs/common";
import { TYPES } from "src/types";
import { HttpStatusCodes } from "../response/HttpStatusCodes";
import { ServiceResult } from "../response/ServiceResult";
import { IUserService } from "./IUserService";
import { IUserRepository } from "src/balanceapp/domain/interfaces/IUserRepository";
import { UserDto } from "../models/DTO/UserDto";
import { User } from "src/balanceapp/domain/entities/User";

@Injectable()
export class UserService implements IUserService {
  constructor(@Inject(TYPES.IUserRepository) private readonly _userRepository: IUserRepository) {}

  async createAsync(userDto: UserDto): Promise<ServiceResult> {
    const user = new User();
    user.name = userDto.name;
    user.email = userDto.email;
    user.password = userDto.password;
    const validUser = user.validateFields();
    if (validUser.length > 0) {
      throw new ServiceResult(HttpStatusCodes.BAD_REQUEST, validUser.join(", "));
    }

    const createdUser = await this._userRepository.createAsync(user);

    if (createdUser == null) throw new ServiceResult(HttpStatusCodes.BAD_REQUEST, "No se pudo crear el usuario");

    // const userResponse = this.createUserResponse(createdUser);
    return new ServiceResult(HttpStatusCodes.OK, "Ingreso creado correctamente", createdUser);
  }

  async loginAsync(userDto: UserDto): Promise<ServiceResult> {
    const user = new User();
    user.email = userDto.email;
    user.password = userDto.password;
    const validUser = user.validateLogin();
    if (validUser.length > 0) {
      throw new ServiceResult(HttpStatusCodes.BAD_REQUEST, validUser.join(", "));
    }
    const userFound = await this._userRepository.loginAsync(user);
    if (userFound == null) throw new ServiceResult(HttpStatusCodes.BAD_REQUEST, "Usuario o contraseña incorrectos");
    return new ServiceResult(HttpStatusCodes.OK, "Usuario logueado correctamente", userFound);
  }
}
