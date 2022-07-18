import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ProductService } from "./evidence/application/services/ProductService";
import { IProductService } from "./evidence/application/services/IProductService";
import { IProductRepository } from "./evidence/domain/interfaces/IProductRepository";
import { ProductRepository } from "./evidence/infrastructure/repositories/ProductRepository";
import { ProductController } from "./evidence/infrastructure/controllers/ProductController";
import { PrismaService } from "./evidence/application/services/PrismaService";
@Module({
  imports: [],
  controllers: [AppController, ProductController],
  providers: [
    PrismaService,
    {
      provide: IProductService,
      useClass: ProductService,
    },
    {
      provide: IProductRepository,
      useClass: ProductRepository,
    },
  ],
})
export class AppModule {}
