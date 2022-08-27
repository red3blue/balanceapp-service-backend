import { IIncomeRepository } from "../../domain/interfaces/IIncomeRepository";
import { PrismaService } from "../../application/services/PrismaService";
import { Income } from "src/balanceapp/domain/entities/Income";
import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "src/balanceapp/domain/interfaces/IUserRepository";
import { User } from "src/balanceapp/domain/entities/User";
import * as bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@Inject(PrismaService) private readonly dbContext: PrismaService) {}
  validateAuthorization(authorization: string) {
    throw new Error("Method not implemented.");
  }

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
      userResponse.email = userFound.email;

      const token = await this.createToken(userFound.id);
      userResponse.token = token;
      return userResponse;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  private async createToken(userId: string): Promise<string> {
    const query: Prisma.TokenCreateArgs = {
      data: {
        userId: userId,
        token: uuidv4(),
        ttl: Number(process.env.TTL_SECONDS),
      },
    };
    const token = await this.dbContext.token.create(query);

    return token.token;
  }
}
