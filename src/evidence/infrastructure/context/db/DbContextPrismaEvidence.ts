import { PrismaClient } from "@prisma/client";

export class DbContextPrismaEvidence extends PrismaClient {
  constructor(connectionString: string) {
    super({ datasources: { db: { url: connectionString } } });
  }
}
