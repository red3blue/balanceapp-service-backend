import { Module } from "@nestjs/common";
import {TYPES} from "./types"; 
import { PrismaService } from "./balanceapp/application/services/PrismaService";
import { IncomeService } from "./balanceapp/application/services/IncomeService";
import { IncomeRepository } from "./balanceapp/infrastructure/repositories/IncomeRepository";
import { AppController } from "./app.controller";
import { IncomeController } from "./balanceapp/infrastructure/controllers/IncomeController";
@Module({
  imports: [],
  controllers: [AppController, IncomeController],
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
  ],
})

export class AppModule {}
