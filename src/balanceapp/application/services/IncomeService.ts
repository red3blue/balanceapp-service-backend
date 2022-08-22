import { Inject, Injectable } from "@nestjs/common";
import { IIncomeRepository } from "src/balanceapp/domain/interfaces/IIncomeRepository";
import { IncomeDto } from "../models/DTO/IncomeDto";
import { HttpStatusCodes } from "../response/HttpStatusCodes";
import { ServiceResult } from "../response/ServiceResult";
import { IIncomeService } from "./IIncomeService";
import { TYPES } from "src/types";
import { Income } from "src/balanceapp/domain/entities/Income";
@Injectable()
export class IncomeService implements IIncomeService {
  constructor(@Inject(TYPES.IIncomeRepository) private readonly _incomeRepository: IIncomeRepository) {}

  async getAll(): Promise<ServiceResult> {
    const incomes = new Array<IncomeDto>();

    const items = await this._incomeRepository.getAll();
    // for (let item of items) {
    //   let income = new IncomeDTO();
    //   income.name = item.name;
    //   income.description = item.description;
    //   income.price = item.price;
    //   incomes.push(income);
    // }

    return new ServiceResult(HttpStatusCodes.OK, "Ingresos obtenidos correctamente", items);
  }

  async createAsync(authorization: string, income: IncomeDto): Promise<ServiceResult> {

    const incomeData = new Income();

    const createdIncome = await this._incomeRepository.createAsync(authorization, incomeData);
    return new ServiceResult(HttpStatusCodes.OK, "Ingreso creado correctamente", createdIncome);
  }
}
