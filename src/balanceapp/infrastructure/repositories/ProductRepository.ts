import { IProductRepository } from "../../domain/interfaces/IProductRepository";
import { PrismaService } from "../../application/services/PrismaService";
import { Product } from "src/evidence/domain/entities/Product";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(@Inject(PrismaService) private readonly dbContext: PrismaService) {}

  async getAll(): Promise<Product[] | null> {
    try {
      const items = await this.dbContext.product.findMany({});
      return items;
    } catch (error) {
      return null;
    }
  }
}
