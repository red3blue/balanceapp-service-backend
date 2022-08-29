import { PrismaService } from "../../application/services/PrismaService";
import { Inject, Injectable } from "@nestjs/common";
import { Category } from "src/balanceapp/domain/entities/Category";
import { User } from "src/balanceapp/domain/entities/User";
import { IExpenseRepository } from "src/balanceapp/domain/interfaces/IExpenseRepository";
import { Expense } from "src/balanceapp/domain/entities/Expense";

@Injectable()
export class ExpenseRepository implements IExpenseRepository {
  constructor(@Inject(PrismaService) private readonly dbContext: PrismaService) {}

  async getAll(): Promise<Expense[] | null> {
    try {
      const expenses = new Array<Expense>();
      const items = await this.dbContext.expense.findMany({
        include: {
          category: true,
          user: true,
        }
      });
      
      for (const item of items) {
        const expense = new Expense();
        const category = new Category();
        const user = new User();
        // expense.id = item.id;
        expense.name = item.name;
        expense.amount = item.amount;
        // expense.categoryId = item.categoryId;
        // expense.userId = item.userId;

        // category.id = item.category.id;
        category.name = item.category.name;

        // user.id = item.user.id;
        user.name = item.user.name;
        user.email = item.user.email;

        expense.category = category;
        expense.user = user;
        expenses.push(expense);
      }
      return expenses
    } catch (error) {
      return null;
    }
  }

  async createAsync(expense: Expense): Promise<Expense | null> {
    try {
      const createdExpense = await this.dbContext.expense.create({ data: {
        name: expense.name,
        amount: expense.amount,
        categoryId: expense.categoryId,
        userId: expense.userId,

      } });

      const expenseResponse = new Expense();
      expenseResponse.id = createdExpense.id;
      expenseResponse.name = createdExpense.name;
      expenseResponse.amount = createdExpense.amount;
      expenseResponse.categoryId = createdExpense.categoryId;
      expenseResponse.userId = createdExpense.userId;
      return expenseResponse;
    } catch (error) {
      return null;
    }
  }
}
