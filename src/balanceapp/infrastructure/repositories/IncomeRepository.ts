import { IIncomeRepository } from "../../domain/interfaces/IIncomeRepository";
import { PrismaService } from "../../application/services/PrismaService";
import { Income } from "src/balanceapp/domain/entities/Income";
import { Inject, Injectable } from "@nestjs/common";
import { Category } from "src/balanceapp/domain/entities/Category";
import { User } from "src/balanceapp/domain/entities/User";

@Injectable()
export class IncomeRepository implements IIncomeRepository {
  constructor(@Inject(PrismaService) private readonly dbContext: PrismaService) {}

  async getAll(): Promise<Income[] | null> {
    try {
      const incomes = new Array<Income>();
      const items = await this.dbContext.income.findMany({
        include: {
          category: true,
          user: true,
        },
      });

      for (const item of items) {
        const income = new Income();
        const category = new Category();
        const user = new User();
        // income.id = item.id;
        income.name = item.name;
        income.amount = item.amount;
        // income.categoryId = item.categoryId;
        // income.userId = item.userId;

        // category.id = item.category.id;
        category.name = item.category.name;

        // user.id = item.user.id;
        user.name = item.user.name;
        user.email = item.user.email;

        income.category = category;
        income.user = user;
        incomes.push(income);
      }
      return incomes;
    } catch (error) {
      return null;
    }
  }

  async createAsync(income: Income): Promise<Income | null> {
    try {
      const createdIncome = await this.dbContext.income.create({
        data: {
          name: income.name,
          amount: income.amount,
          categoryId: income.categoryId,
          userId: income.userId,
        },
      });

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
