import { Controller, Get, Inject } from "@nestjs/common";
import { ProductDTO } from "src/evidence/application/models/DTO/ProductDTO";
import { ServiceResult } from "src/evidence/application/response/ServiceResult";
import { IProductService } from "src/evidence/application/services/IProductService";
import { TYPES } from "src/types";

@Controller("/product")
export class ProductController {
  constructor(@Inject(TYPES.IProductService) private readonly productService: IProductService) {}

  @Get()
  async getAll(): Promise<ServiceResult | any> {

    const serviceResult = await this.productService.getAll();
    return serviceResult;
  }
}
