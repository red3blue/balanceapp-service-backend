import { PrismaClient } from "@prisma/client";

export class DbContextPrismaBalanceApp extends PrismaClient {
  constructor(connectionString: string) {
    super({ datasources: { db: { url: connectionString } } });
  }
}
