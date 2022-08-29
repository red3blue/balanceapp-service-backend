import { Controller, Get, Inject, Post, Headers, Body, HttpException, HttpStatus } from "@nestjs/common";
import { CategoryDto } from "src/balanceapp/application/models/DTO/category/CategoryDto";
import { ServiceResult } from "src/balanceapp/application/response/ServiceResult";
import { ICategoryService } from "src/balanceapp/application/services/ICategoryService";
import { TYPES } from "src/types";

@Controller("/category")
export class CategoryController {
  constructor(@Inject(TYPES.ICategoryService) private readonly _categoryService: ICategoryService) {}

  //   @Get("/all")
  //   async getAll(): Promise<ServiceResult | any> {
  //     try {
  //       const serviceResult = await this._incomeService.getAll();
  //       return serviceResult;
  //     } catch (error) {
  //       let err = new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
  //       if (error instanceof ServiceResult) err = new HttpException(error.message, error.statusCode);
  //       throw err;
  //     }
  //   }

  @Post("/create")
  async create(@Body() body: CategoryDto): Promise<ServiceResult> {
    try {
      const category = new CategoryDto();
      category.name = body.name;
      const serviceResult = await this._categoryService.createAsync(category);
      return serviceResult;
    } catch (error) {
      let err = new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
      if (error instanceof ServiceResult) err = new HttpException(error.message, error.statusCode);
      throw err;
    }
  }

  @Post("/create/user")
  async createCategoryForUser(@Headers("Authorization") authorization: string, @Body() body: CategoryDto): Promise<ServiceResult> {
    try {
      const category = new CategoryDto();
      category.name = body.name;
      const serviceResult = await this._categoryService.createCategoryForUserAsync(authorization ?? "", category);
      return serviceResult;
    } catch (error) {
      let err = new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
      if (error instanceof ServiceResult) err = new HttpException(error.message, error.statusCode);
      throw err;
    }
  }
}
