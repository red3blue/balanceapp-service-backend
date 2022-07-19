import { ServiceResult } from "../response/ServiceResult";
export interface IProductService {
  getAll(): Promise<ServiceResult>;
}
