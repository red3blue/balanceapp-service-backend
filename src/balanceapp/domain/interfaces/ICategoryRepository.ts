import { Category } from "../entities/Category";

export interface ICategoryRepository {
  createAsync(category: Category): Promise<Category | null>;
  findCategoryByNameAsync(name: string): Promise<Category | null>;
  attachCategoryToUserAsync(userId: string, categoryId: string): Promise<Category | null>;
  findUserCategoryByUserIdCategoryIdAsync(userId: string, categoryId: string): Promise<Category | null>;
}
