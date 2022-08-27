import { PrismaService } from "../../application/services/PrismaService";
import { Inject, Injectable } from "@nestjs/common";
import { ICategoryRepository } from "src/balanceapp/domain/interfaces/ICategoryRepository";
import { Category } from "src/balanceapp/domain/entities/Category";

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(@Inject(PrismaService) private readonly dbContext: PrismaService) {}
  validateAuthorization(authorization: string) {
    throw new Error("Method not implemented.");
  }

  async createAsync(category: Category): Promise<Category> {
      try {
        const newCategory = await this.dbContext.category.create({ data: category });

        const categoryResponse = new Category();
        categoryResponse.id = newCategory.id;
        categoryResponse.name = newCategory.name.charAt(0).toUpperCase() + newCategory.name.slice(1);
        
        return categoryResponse;
      } catch (error) {
        console.log(error);
        return null;
      }
  }
}
