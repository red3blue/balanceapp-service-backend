import { PrismaService } from "../../application/services/PrismaService";
import { Inject, Injectable } from "@nestjs/common";
import { ITokenRepository } from "src/balanceapp/domain/interfaces/ITokenRepository";
import { Token } from "src/balanceapp/domain/entities/Token";

@Injectable()
export class TokenRepository implements ITokenRepository {
  constructor(@Inject(PrismaService) private readonly dbContext: PrismaService) {}

  async findValidTokenAsync(token: string): Promise<Token | null> {
      try {
        const tokenFound = await this.dbContext.token.findFirst({
          where: {
            token: token,
          },
        });

        if (!tokenFound) return null;
        return new Token(tokenFound.token, tokenFound.userId);
      } catch (error) {
        return null
      }
  }
}
