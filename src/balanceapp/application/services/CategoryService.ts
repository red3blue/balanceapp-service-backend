import { Inject, Injectable } from "@nestjs/common";
import { Category } from "src/balanceapp/domain/entities/Category";
import { ICategoryRepository } from "src/balanceapp/domain/interfaces/ICategoryRepository";
import { ITokenRepository } from "src/balanceapp/domain/interfaces/ITokenRepository";
import { TYPES } from "src/types";
import { CategoryDto } from "../models/DTO/category/CategoryDto";
import { HttpStatusCodes } from "../response/HttpStatusCodes";
import { ServiceResult } from "../response/ServiceResult";
import { ICategoryService } from "./ICategoryService";

@Injectable()
export class CategoryService implements ICategoryService {
  private readonly _categoryRepository: ICategoryRepository;
  private readonly _tokenRepository: ITokenRepository;

  constructor(@Inject(TYPES.ICategoryRepository) CategoryRepository: ICategoryRepository, @Inject(TYPES.ITokenRepository) TokenRepository: ITokenRepository) {
    this._categoryRepository = CategoryRepository;
    this._tokenRepository = TokenRepository;
  }

  async createAsync(categoryDto: CategoryDto): Promise<ServiceResult> {
    const category = new Category();
    category.name = categoryDto.name.toLowerCase();

    const createdCategory = await this._categoryRepository.createAsync(category);

    if (createdCategory == null) throw new ServiceResult(HttpStatusCodes.BAD_REQUEST, "No se pudo crear la categoria");

    return new ServiceResult(HttpStatusCodes.OK, "Categoria creada correctamente", createdCategory);
  }

  async createCategoryForUserAsync(authorization: string, categoryDto: CategoryDto): Promise<ServiceResult> {
    const validToken = await this._tokenRepository.findValidTokenAsync(authorization);

    if (validToken == null) throw new ServiceResult(HttpStatusCodes.UNAUTHORIZED, "Token invalido");

    const category = new Category();
    category.name = categoryDto.name.toLowerCase();

    const findCategory = await this._categoryRepository.findCategoryByNameAsync(category.name);

    if (findCategory == null) {
      const createdCategory = await this._categoryRepository.createAsync(category);
      if (createdCategory == null) throw new ServiceResult(HttpStatusCodes.BAD_REQUEST, "No se pudo crear la categoria");
      category.id = createdCategory.id;
    } else {
      category.id = findCategory.id;
    }

    const isAlreadyAttached = await this.isAlreadyAttached(validToken.userId, category.id);

    if (isAlreadyAttached) throw new ServiceResult(HttpStatusCodes.BAD_REQUEST, "La categoria ya esta asociada al usuario");

    const attachCategory = await this._categoryRepository.attachCategoryToUserAsync(validToken.userId, category.id);

    if (attachCategory == null) throw new ServiceResult(HttpStatusCodes.BAD_REQUEST, "No se pudo asociar la categoria al usuario");

    category.name = category.name.charAt(0).toUpperCase() + category.name.slice(1);
    return new ServiceResult(HttpStatusCodes.OK, "Categoria creada correctamente", category);
  }

  private async isAlreadyAttached(userId: string, categoryId: string): Promise<boolean> {
    const isAlreadyAttached = await this._categoryRepository.findUserCategoryByUserIdCategoryIdAsync(userId, categoryId);

    if (isAlreadyAttached == null) return false;
    return true;
  }
}
