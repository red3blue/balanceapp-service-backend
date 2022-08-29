import { Token } from "../entities/Token";

export interface ITokenRepository {
  findValidTokenAsync(token: string): Promise<Token | null>;
}
