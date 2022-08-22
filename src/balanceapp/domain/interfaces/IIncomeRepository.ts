import { Income } from "../entities/Income";

export interface IIncomeRepository {
  getAll(): Promise<Income[] | null>;
  createAsync(authorization: string, income: Income): Promise<Income | null>;
}
