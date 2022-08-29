import { Category } from "./Category";
import { User } from "./User";

export class Income {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  
  name: string;
  amount: number;
  categoryId: string;
  userId: string;
  category: Category
  user: User;

  validateFields() {
    return [];
  }
}
