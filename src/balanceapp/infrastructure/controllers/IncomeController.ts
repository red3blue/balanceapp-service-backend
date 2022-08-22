import { Controller, Get, Inject, Post, Headers, Body, HttpException, HttpStatus } from "@nestjs/common";
import { IncomeDto } from "src/balanceapp/application/models/DTO/IncomeDto";
import { ServiceResult } from "src/balanceapp/application/response/ServiceResult";
import { IIncomeService } from "src/balanceapp/application/services/IIncomeService";
import { TYPES } from "src/types";

@Controller("/income")
export class IncomeController {
  constructor(@Inject(TYPES.IIncomeService) private readonly _incomeService: IIncomeService) {}

  @Get("/all")
  async getAll(): Promise<ServiceResult | any> {
    try {
      const serviceResult = await this._incomeService.getAll();
      return serviceResult;
    } catch (error) {
      let err = new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
      if (error instanceof ServiceResult) err = new HttpException(error.message, error.statusCode);
      throw err;
    }

  }

  @Post("/create")
  async create(@Headers("Authorization") authorization: string, @Body() income: IncomeDto): Promise<ServiceResult> {
    try {
      const serviceResult = await this._incomeService.createAsync(authorization, income);
      return serviceResult;
    } catch (error) {
      let err = new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
      if (error instanceof ServiceResult) err = new HttpException(error.message, error.statusCode);
      throw err;
    }
  }
}
