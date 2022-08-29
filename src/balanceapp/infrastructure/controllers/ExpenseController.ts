import { Controller, Get, Inject, Post, Headers, Body, HttpException, HttpStatus } from "@nestjs/common";
import { ExpenseDto } from "src/balanceapp/application/models/DTO/ExpenseDto";
import { ServiceResult } from "src/balanceapp/application/response/ServiceResult";
import { IExpenseService } from "src/balanceapp/application/services/IExpenseService";
import { TYPES } from "src/types";

@Controller("/expense")
export class ExpenseController {
  constructor(@Inject(TYPES.IExpenseService) private readonly _expenseService: IExpenseService) {}

  @Get("/all")
  async getAll(): Promise<ServiceResult | any> {
    try {
      const serviceResult = await this._expenseService.getAll();
      return serviceResult;
    } catch (error) {
      let err = new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
      if (error instanceof ServiceResult) err = new HttpException(error.message, error.statusCode);
      throw err;
    }
  }

  @Post("/create")
  async create(@Headers("Authorization") authorization: string, @Body() expenseDto: ExpenseDto): Promise<ServiceResult> {
    try {
      const expense = new ExpenseDto();
      expense.name = expenseDto.name;
      expense.amount = expenseDto.amount;
      expense.categoryId = expenseDto.categoryId;
      const serviceResult = await this._expenseService.createAsync(authorization, expense);
      return serviceResult;
    } catch (error) {
      let err = new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
      if (error instanceof ServiceResult) err = new HttpException(error.message, error.statusCode);
      throw err;
    }
  }
}
