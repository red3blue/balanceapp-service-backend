import { ServiceResult } from "../response/ServiceResult";
export interface IIncomeService {
  getAll(): Promise<ServiceResult>;
}
