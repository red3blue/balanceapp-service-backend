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
import { IExpenseService } from "./IExpenseService";
import { ExpenseDto } from "../models/DTO/ExpenseDto";
import { Expense } from "src/balanceapp/domain/entities/Expense";
import { IExpenseRepository } from "src/balanceapp/domain/interfaces/IExpenseRepository";

@Injectable()
export class ExpenseService implements IExpenseService {
  private readonly _expenseRepository: IExpenseRepository;
  private readonly _tokenRepository: ITokenRepository;

  constructor(@Inject(TYPES.IExpenseRepository) ExpenseRepository: IExpenseRepository, @Inject(TYPES.ITokenRepository) TokenRepository: ITokenRepository) {
    this._expenseRepository = ExpenseRepository;
    this._tokenRepository = TokenRepository;
  }
  async getByUserIdAsync(authorization: string): Promise<ServiceResult> {
    throw new Error("Method not implemented.");
  }

  async getAll(): Promise<ServiceResult> {
    const items = await this._expenseRepository.getAll();

    return new ServiceResult(HttpStatusCodes.OK, "Egresos obtenidos correctamente", items);
  }

  async createAsync(authorization: string, expenseDto: ExpenseDto): Promise<ServiceResult> {
    const validToken = await this._tokenRepository.findValidTokenAsync(authorization);

    if (validToken == null) throw new ServiceResult(HttpStatusCodes.UNAUTHORIZED, "Token invalido");

    const expense = new Income();

    expense.name = expenseDto.name;
    expense.amount = expenseDto.amount;
    expense.categoryId = expenseDto.categoryId;
    expense.userId = validToken.userId;

    const validExpense = expense.validateFields();

    if (validExpense.length > 0) {
      throw new ServiceResult(HttpStatusCodes.BAD_REQUEST, validExpense.join(", "));
    }

    const createdExpense = await this._expenseRepository.createAsync(expense);

    if (createdExpense == null) throw new ServiceResult(HttpStatusCodes.BAD_REQUEST, "No se pudo crear el egreso");
    return new ServiceResult(HttpStatusCodes.OK, "Egreso creado correctamente", createdExpense);
  }
}
