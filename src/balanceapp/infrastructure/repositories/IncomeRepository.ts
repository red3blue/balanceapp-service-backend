import { IIncomeRepository } from "../../domain/interfaces/IIncomeRepository";
import { PrismaService } from "../../application/services/PrismaService";
import { Income } from "src/balanceapp/domain/entities/Income";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class IncomeRepository implements IIncomeRepository {
  constructor(@Inject(PrismaService) private readonly dbContext: PrismaService) {}

  async getAll(): Promise<Income[] | null> {
    try {
      const items = await this.dbContext.income.findMany();
      return items;
    } catch (error) {
      return null;
    }
  }

  async createAsync(authorization: string, income: Income): Promise<Income | null> {
    try {
      const createdIncome = await this.dbContext.income.create({ data: income });
      return createdIncome;
    } catch (error) {
      return null;
    }
  }
}
