import { Controller, Get, Inject, Post, Headers, Body, HttpException, HttpStatus } from "@nestjs/common";
import { UserDto } from "src/balanceapp/application/models/DTO/UserDto";
import { ServiceResult } from "src/balanceapp/application/response/ServiceResult";
import { IUserService } from "src/balanceapp/application/services/IUserService";
import { TYPES } from "src/types";

@Controller("/user")
export class UserController {
  constructor(@Inject(TYPES.IUserService) private readonly _userService: IUserService) {}

  @Post("/create")
  async create(@Body() userDto: UserDto): Promise<ServiceResult> {
    try {
      const user = new UserDto();
      user.name = userDto.name;
      user.email = userDto.email;
      user.password = userDto.password;

      const serviceResult = await this._userService.createAsync(user);
      return serviceResult;
    } catch (error) {
      let err = new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
      if (error instanceof ServiceResult) err = new HttpException(error.message, error.statusCode);
      throw err;
    }
  }

  @Post("/login")
  async login(@Body() userDto: UserDto): Promise<ServiceResult> {
    try {
      const user = new UserDto();
      user.email = userDto.email;
      user.password = userDto.password;

      const serviceResult = await this._userService.loginAsync(user);
      return serviceResult;
    } catch (error) {
      let err = new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
      if (error instanceof ServiceResult) err = new HttpException(error.message, error.statusCode);
      throw err;
    }
  }
}
