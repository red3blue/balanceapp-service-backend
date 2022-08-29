export class Token {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  token: string;
  ttl: number;
  userId: string;

  constructor(token: string, userId: string) {
    this.token = token;
    this.userId = userId;
  }
}
