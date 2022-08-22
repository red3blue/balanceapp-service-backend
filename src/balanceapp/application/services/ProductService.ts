import { Inject, Injectable } from "@nestjs/common";
import { IProductRepository } from "src/evidence/domain/interfaces/IProductRepository";
import { ProductDTO } from "../models/DTO/ProductDTO";
import { HttpStatusCodes } from "../response/HttpStatusCodes";
import { ServiceResult } from "../response/ServiceResult";
import { IProductService } from "./IProductService";
import { TYPES } from "src/types";
@Injectable()
export class ProductService implements IProductService {
  constructor(@Inject(TYPES.IProductRepository) private readonly productRepository: IProductRepository) {}

  async getAll(): Promise<ServiceResult> {
    const products = new Array<ProductDTO>();

    const items = await this.productRepository.getAll();
    for (let item of items) {
      let product = new ProductDTO();
      product.name = item.name;
      product.description = item.description;
      product.price = item.price;
      products.push(product);
    }

    return new ServiceResult(HttpStatusCodes.NOT_FOUND, "Productos obtenidos correctamente", products);
    // return products;
  }
}
