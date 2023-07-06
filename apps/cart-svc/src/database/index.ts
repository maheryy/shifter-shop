import { join } from "path";
import { DataSource } from "typeorm";

const db = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [join(__dirname, "..", "entities", "*.entity{.ts,.js}")],
  synchronize: true,
});

export default db;
