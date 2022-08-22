import { Controller, Get, Inject } from "@nestjs/common";
import { IncomeDto } from "src/balanceapp/application/models/DTO/IncomeDto";
import { ServiceResult } from "src/balanceapp/application/response/ServiceResult";
import { IIncomeService } from "src/balanceapp/application/services/IIncomeService";
import { TYPES } from "src/types";

@Controller("/income")
export class IncomeController {
  constructor(@Inject(TYPES.IIncomeService) private readonly _incomeService: IIncomeService) {}

  @Get()
  async getAll(): Promise<ServiceResult | any> {

    const serviceResult = await this._incomeService.getAll();
    return serviceResult;
  }
}
