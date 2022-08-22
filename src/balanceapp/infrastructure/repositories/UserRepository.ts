import { IIncomeRepository } from "../../domain/interfaces/IIncomeRepository";
import { PrismaService } from "../../application/services/PrismaService";
import { Income } from "src/balanceapp/domain/entities/Income";
import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "src/balanceapp/domain/interfaces/IUserRepository";
import { User } from "src/balanceapp/domain/entities/User";

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@Inject(PrismaService) private readonly dbContext: PrismaService) {}

  async createAsync(user: User): Promise<User | null> {
    try {
      const newUser = await this.dbContext.user.create({ data: user });

      const userResponse = new User();
      userResponse.id = newUser.id;
      userResponse.name = newUser.name;
      userResponse.email = newUser.email;
      userResponse.password = newUser.password;

      return user;
    } catch (error) {
      return null;
    }
  }
}
