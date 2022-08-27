import { Category } from "src/balanceapp/domain/entities/Category";
import { User } from "src/balanceapp/domain/entities/User";

export class IncomeDto {
  id: string;
  name: string;
  ammount: number;
  categoryId: string;
  userId: string;
  category: Category | null;
  user: User | null;
}
