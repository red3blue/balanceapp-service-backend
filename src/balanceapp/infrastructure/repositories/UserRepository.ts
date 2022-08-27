import { IIncomeRepository } from "../../domain/interfaces/IIncomeRepository";
import { PrismaService } from "../../application/services/PrismaService";
import { Income } from "src/balanceapp/domain/entities/Income";
import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "src/balanceapp/domain/interfaces/IUserRepository";
import { User } from "src/balanceapp/domain/entities/User";
import * as bcrypt from "bcryptjs";
@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@Inject(PrismaService) private readonly dbContext: PrismaService) {}

  async createAsync(user: User): Promise<User | null> {
    try {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(user.password, salt);
      user.password = hash;

      const newUser = await this.dbContext.user.create({ data: user });

      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async loginAsync(user: User): Promise<User | null> {
    try {
      const userFound = await this.dbContext.user.findFirst({
        where: {
          email: user.email,
        },
      });
      if (!userFound) return null;
      const comparision = bcrypt.compareSync(user.password, userFound.password);
      if (!comparision) return null;

      const userResponse = new User();
      userResponse.id = userFound.id;
      userResponse.name = userFound.name;
      userResponse.email = userFound.email;
      userResponse.password = userFound.password;

      return userResponse;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
