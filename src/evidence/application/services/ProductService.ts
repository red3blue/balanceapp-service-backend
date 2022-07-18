import { Inject, Injectable } from "@nestjs/common";
import { IProductRepository } from "src/evidence/domain/interfaces/IProductRepository";
import { ProductDTO } from "../models/DTO/ProductDTO";
import { IProductService } from "./IProductService";

@Injectable()
export class ProductService implements IProductService {
  constructor(@Inject(IProductRepository) private readonly productRepository: IProductRepository) {}

  async getAll(): Promise<ProductDTO[] | null> {
    const products = new Array<ProductDTO>();

    const items = await this.productRepository.getAll();
    for (let item of items) {
      let product = new ProductDTO();
      product.name = item.name;
      product.description = item.description;
      product.price = item.price;
      products.push(product);
    }
    return products;
  }
}
