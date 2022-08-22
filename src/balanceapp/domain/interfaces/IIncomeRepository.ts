import { Income } from "../entities/Income";

export interface IIncomeRepository {
  getAll(): Promise<Income[] | null>;
}
