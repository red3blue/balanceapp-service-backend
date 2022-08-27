import { User } from "./User";

export class Category {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;

  name: string;
  userId: string;
}
