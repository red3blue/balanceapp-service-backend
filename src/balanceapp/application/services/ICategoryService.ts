import { CategoryDto } from "../models/DTO/category/CategoryDto";
import { ServiceResult } from "../response/ServiceResult";
export interface ICategoryService {
  createAsync(categoryDto: CategoryDto): Promise<ServiceResult>;
  createCategoryForUserAsync(authorization: string, categoryDto: CategoryDto): Promise<ServiceResult>;
}
