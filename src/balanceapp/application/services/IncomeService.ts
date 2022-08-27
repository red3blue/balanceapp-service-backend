import { Inject, Injectable } from "@nestjs/common";
import { IIncomeRepository } from "src/balanceapp/domain/interfaces/IIncomeRepository";
import { IncomeDto } from "../models/DTO/IncomeDto";
import { HttpStatusCodes } from "../response/HttpStatusCodes";
import { ServiceResult } from "../response/ServiceResult";
import { IIncomeService } from "./IIncomeService";
import { TYPES } from "src/types";
import { Income } from "src/balanceapp/domain/entities/Income";
import { IUserRepository } from "src/balanceapp/domain/interfaces/IUserRepository";

@Injectable()
export class IncomeService implements IIncomeService {
  private readonly _incomeRepository: IIncomeRepository;
  private readonly _userRepository: IUserRepository;

  constructor(@Inject(TYPES.IIncomeRepository) IncomeRepository: IIncomeRepository, @Inject(TYPES.IUserRepository) UserRepository: IUserRepository) {
    this._incomeRepository = IncomeRepository;
    this._userRepository = UserRepository;
  }

  async getAll(): Promise<ServiceResult> {
    const incomes = new Array<IncomeDto>();

    const items = await this._incomeRepository.getAll();

    return new ServiceResult(HttpStatusCodes.OK, "Ingresos obtenidos correctamente", items);
  }

  async createAsync(authorization: string, incomeDto: IncomeDto): Promise<ServiceResult> {
    const validUser = this._userRepository.validateAuthorization(authorization);
    if (validUser === null) return new ServiceResult(HttpStatusCodes.UNAUTHORIZED, "Usuario no autorizado");

    const income = new Income();

    income.name = incomeDto.name;
    income.amount = incomeDto.amount;
    income.categoryId = incomeDto.categoryId;
    income.userId = validUser.id;

    const validIncome = income.validateFields();

    if (validIncome.length > 0) {
      throw new ServiceResult(HttpStatusCodes.BAD_REQUEST, validIncome.join(", "));
    }

    const createdIncome = await this._incomeRepository.createAsync(authorization, income);

    if (createdIncome == null) throw new ServiceResult(HttpStatusCodes.BAD_REQUEST, "No se pudo crear el ingreso");
    return new ServiceResult(HttpStatusCodes.OK, "Ingreso creado correctamente", createdIncome);
  }
}
