import { Category } from "../entities/Category";

export interface ICategoryRepository {
  createAsync(category: Category): Promise<Category | null>;
}
