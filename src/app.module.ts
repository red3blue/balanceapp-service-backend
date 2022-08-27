import { Module } from "@nestjs/common";
import { TYPES } from "./types";
import { PrismaService } from "./balanceapp/application/services/PrismaService";
import { IncomeService } from "./balanceapp/application/services/IncomeService";
import { IncomeRepository } from "./balanceapp/infrastructure/repositories/IncomeRepository";
import { AppController } from "./app.controller";
import { IncomeController } from "./balanceapp/infrastructure/controllers/IncomeController";
import { UserController } from "./balanceapp/infrastructure/controllers/UserController";
import { UserService } from "./balanceapp/application/services/UserService";
import { UserRepository } from "./balanceapp/infrastructure/repositories/UserRepository";
import { CategoryRepository } from "./balanceapp/infrastructure/repositories/CategoryRepository";
import { CategoryService } from "./balanceapp/application/services/CategoryService";
import { CategoryController } from "./balanceapp/infrastructure/controllers/CategoryController";
import { TokenRepository } from "./balanceapp/infrastructure/repositories/TokenRepository";
@Module({
  imports: [],
  controllers: [AppController, IncomeController, UserController, CategoryController],
  providers: [
    PrismaService,
    {
      provide: TYPES.IIncomeService,
      useClass: IncomeService,
    },
    {
      provide: TYPES.IIncomeRepository,
      useClass: IncomeRepository,
    },
    {
      provide: TYPES.IUserService,
      useClass: UserService,
    },
    {
      provide: TYPES.IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: TYPES.ICategoryRepository,
      useClass: CategoryRepository,
    },
    {
      provide: TYPES.ICategoryService,
      useClass: CategoryService,
    },
    {
      provide: TYPES.ITokenRepository,
      useClass: TokenRepository,
    }
  ],
})
export class AppModule {}
