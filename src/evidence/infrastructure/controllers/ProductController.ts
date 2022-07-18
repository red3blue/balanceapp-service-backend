import { Controller, Get, Inject } from "@nestjs/common";
import { ProductDTO } from "src/evidence/application/models/DTO/ProductDTO";
import { IProductService } from "src/evidence/application/services/IProductService";

@Controller("/product")
export class ProductController {
    constructor(@Inject(IProductService) private readonly productService: IProductService) {}
    
    @Get()
    async getAll(): Promise<ProductDTO[] | null> {
        return this.productService.getAll();
    }
}