import { IIncomeRepository } from "../../domain/interfaces/IIncomeRepository";
import { PrismaService } from "../../application/services/PrismaService";
import { Income } from "src/balanceapp/domain/entities/Income";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class IncomeRepository implements IIncomeRepository {
  constructor(@Inject(PrismaService) private readonly dbContext: PrismaService) {}

  async getAll(): Promise<Income[] | null> {
    try {
      const incomes = new Array<Income>();
      const items = await this.dbContext.income.findMany();
      for (const item of items) {
        const income = new Income();
        income.id = item.id;
        income.name = item.name;
        income.amount = item.amount;
        income.categoryId = item.categoryId;
        income.userId = item.userId;
        incomes.push(income);
      }
      return incomes
    } catch (error) {
      return null;
    }
  }

  async createAsync(authorization: string, income: Income): Promise<Income | null> {
    try {
      const createdIncome = await this.dbContext.income.create({ data: income });

      const incomeResponse = new Income();
      incomeResponse.id = createdIncome.id;
      incomeResponse.name = createdIncome.name;
      incomeResponse.amount = createdIncome.amount;
      incomeResponse.categoryId = createdIncome.categoryId;
      incomeResponse.userId = createdIncome.userId;
      return incomeResponse;
    } catch (error) {
      return null;
    }
  }
}
