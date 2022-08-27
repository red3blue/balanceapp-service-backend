import { Inject, Injectable } from "@nestjs/common";
import { Category } from "src/balanceapp/domain/entities/Category";
import { ICategoryRepository } from "src/balanceapp/domain/interfaces/ICategoryRepository";
import { TYPES } from "src/types";
import { CategoryDto } from "../models/DTO/category/CategoryDto";
import { HttpStatusCodes } from "../response/HttpStatusCodes";
import { ServiceResult } from "../response/ServiceResult";
import { ICategoryService } from "./ICategoryService";

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(@Inject(TYPES.ICategoryRepository) private readonly _categoryRepository: ICategoryRepository) {}

  async createAsync(categoryDto: CategoryDto): Promise<ServiceResult> {
    const category = new Category();
    category.name = categoryDto.name.toLowerCase();

    const createdCategory = await this._categoryRepository.createAsync(category);
    
    if (createdCategory == null) throw new ServiceResult(HttpStatusCodes.BAD_REQUEST, "No se pudo crear la categoria");

    return new ServiceResult(HttpStatusCodes.OK, "Categoria creada correctamente", createdCategory);
  }
}
