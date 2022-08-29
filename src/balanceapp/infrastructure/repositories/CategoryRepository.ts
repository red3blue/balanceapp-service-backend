import { PrismaService } from "../../application/services/PrismaService";
import { Inject, Injectable } from "@nestjs/common";
import { ICategoryRepository } from "src/balanceapp/domain/interfaces/ICategoryRepository";
import { Category } from "src/balanceapp/domain/entities/Category";

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(@Inject(PrismaService) private readonly dbContext: PrismaService) {}

  async createAsync(category: Category): Promise<Category> {
    try {
      const newCategory = await this.dbContext.category.create({ data: category });

      const categoryResponse = new Category();
      categoryResponse.id = newCategory.id;
      categoryResponse.name = newCategory.name.charAt(0).toUpperCase() + newCategory.name.slice(1);

      return categoryResponse;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async findCategoryByNameAsync(name: string): Promise<Category> {
    try {
      const categoryFound = await this.dbContext.category.findUnique({
        where: {
          name: name,
        },
      });

      if (!categoryFound) return null;

      const categoryResponse = new Category();
      categoryResponse.id = categoryFound.id;
      categoryResponse.name = categoryFound.name.charAt(0).toUpperCase() + categoryFound.name.slice(1);

      return categoryResponse;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async attachCategoryToUserAsync(userId: string, categoryId: string): Promise<Category> {
    try {
      const newUserCategory = await this.dbContext.userCategory.create({
        data: {
          userId: userId,
          categoryId: categoryId,
        },
      });

      if (!newUserCategory) return null;

      const categoryResponse = new Category();
      categoryResponse.id = newUserCategory.id;

      return categoryResponse;
    } catch (error) {}
  }

  async findUserCategoryByUserIdCategoryIdAsync(userId: string, categoryId: string): Promise<Category> {
    try {
      const userCategoryFound = await this.dbContext.userCategory.findFirst({
        where: {
          userId: userId,
          categoryId: categoryId,
          isDeleted: false,
        },
      });

      if (!userCategoryFound) return null;

      const categoryResponse = new Category();
      categoryResponse.id = userCategoryFound.id;
      return categoryResponse;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
