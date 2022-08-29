import { Income } from "../entities/Income";

export interface IIncomeRepository {
  getAll(): Promise<Income[] | null>;
  createAsync(income: Income): Promise<Income | null>;
  getByUserIdAsync(userId: string): Promise<Income[] | null>;
}
