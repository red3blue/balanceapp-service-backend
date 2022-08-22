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

//   async getAll(): Promise<ServiceResult> {
//     const incomes = new Array<IncomeDto>();

//     const items = await this._incomeRepository.getAll();
//     // for (let item of items) {
//     //   let income = new IncomeDTO();
//     //   income.name = item.name;
//     //   income.description = item.description;
//     //   income.price = item.price;
//     //   incomes.push(income);
//     // }

//     return new ServiceResult(HttpStatusCodes.OK, "Ingresos obtenidos correctamente", items);
//   }

  async createAsync(userDto: UserDto): Promise<ServiceResult> {

    const user = new User();
    user.name = userDto.name;
    user.email = userDto.email;
    user.password = userDto.password;
    const validUser = user.validateFields()
    if(validUser.length > 0){
      throw new ServiceResult(HttpStatusCodes.BAD_REQUEST, validUser.join(', '));
    }

    const createdUser = await this._userRepository.createAsync(user);

    if(createdUser == null) throw new ServiceResult(HttpStatusCodes.BAD_REQUEST, "No se pudo crear el usuario");

    // const userResponse = this.createUserResponse(createdUser);
    return new ServiceResult(HttpStatusCodes.OK, "Ingreso creado correctamente", createdUser);
  }
}
