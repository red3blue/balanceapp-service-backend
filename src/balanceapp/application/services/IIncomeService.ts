import { IncomeDto } from "../models/DTO/IncomeDto";
import { ServiceResult } from "../response/ServiceResult";
export interface IIncomeService {
  getAll(): Promise<ServiceResult>;
  createAsync(authorization: string, income: IncomeDto): Promise<ServiceResult>;
  getByUserIdAsync(authorization: string): Promise<ServiceResult>;
}
