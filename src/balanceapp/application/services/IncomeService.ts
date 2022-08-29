import { Inject, Injectable } from "@nestjs/common";
import { IIncomeRepository } from "src/balanceapp/domain/interfaces/IIncomeRepository";
import { IncomeDto } from "../models/DTO/IncomeDto";
import { HttpStatusCodes } from "../response/HttpStatusCodes";
import { ServiceResult } from "../response/ServiceResult";
import { IIncomeService } from "./IIncomeService";
import { TYPES } from "src/types";
import { Income } from "src/balanceapp/domain/entities/Income";
import { IUserRepository } from "src/balanceapp/domain/interfaces/IUserRepository";
import { ITokenRepository } from "src/balanceapp/domain/interfaces/ITokenRepository";

@Injectable()
export class IncomeService implements IIncomeService {
  private readonly _incomeRepository: IIncomeRepository;
  private readonly _tokenRepository: ITokenRepository;

  constructor(@Inject(TYPES.IIncomeRepository) IncomeRepository: IIncomeRepository, @Inject(TYPES.ITokenRepository) TokenRepository: ITokenRepository) {
    this._incomeRepository = IncomeRepository;
    this._tokenRepository = TokenRepository;
  }

  async getAll(): Promise<ServiceResult> {
    const incomes = new Array<IncomeDto>();

    const items = await this._incomeRepository.getAll();

    return new ServiceResult(HttpStatusCodes.OK, "Ingresos obtenidos correctamente", items);
  }

  async createAsync(authorization: string, incomeDto: IncomeDto): Promise<ServiceResult> {
    const validToken = await this._tokenRepository.findValidTokenAsync(authorization);

    if (validToken == null) throw new ServiceResult(HttpStatusCodes.UNAUTHORIZED, "Token invalido");

    const income = new Income();

    income.name = incomeDto.name;
    income.amount = incomeDto.amount;
    income.categoryId = incomeDto.categoryId;
    income.userId = validToken.userId;

    const validIncome = income.validateFields();

    if (validIncome.length > 0) {
      throw new ServiceResult(HttpStatusCodes.BAD_REQUEST, validIncome.join(", "));
    }

    const createdIncome = await this._incomeRepository.createAsync(income);

    if (createdIncome == null) throw new ServiceResult(HttpStatusCodes.BAD_REQUEST, "No se pudo crear el ingreso");
    return new ServiceResult(HttpStatusCodes.OK, "Ingreso creado correctamente", createdIncome);
  }

  async getByUserIdAsync(authorization: string): Promise<ServiceResult> {
    const validToken = await this._tokenRepository.findValidTokenAsync(authorization);

    if (validToken == null) throw new ServiceResult(HttpStatusCodes.UNAUTHORIZED, "Token invalido");

    const items = await this._incomeRepository.getByUserIdAsync(validToken.userId);

    return new ServiceResult(HttpStatusCodes.OK, "Ingresos obtenidos correctamente", items);
  }
}
