import { Expense } from "../entities/Expense";

export interface IExpenseRepository {
    getAll(): Promise<Expense[] | null>;
    createAsync(expense: Expense): Promise<Expense | null>;
}
