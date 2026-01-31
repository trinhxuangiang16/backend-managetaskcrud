import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./generated/prisma/index.js";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL missing");
}

const dbUrl = new URL(DATABASE_URL);

const adapter = new PrismaMariaDb({
  host: dbUrl.hostname,
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.substring(1),
  port: parseInt(dbUrl.port),
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

export { prisma };
