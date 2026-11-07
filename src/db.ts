import "dotenv/config";
import mysql, { type Pool } from "mysql2/promise";
function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is required`);
  }
  return value;
}

const port = Number(getRequiredEnv("DB_PORT"));

const pool: Pool = mysql.createPool({
  host: getRequiredEnv("DB_HOST"),
  user: getRequiredEnv("DB_USER"),
  password: getRequiredEnv("DB_PASSWORD"),
  database: getRequiredEnv("DB_NAME"),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export { pool };
