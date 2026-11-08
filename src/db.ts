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

if (!Number.isInteger(port) || port <= 0 || port > 65535) {
  throw new Error(`DB_PORT must be an integer between 1 and 65535`);
}

const pool: Pool = mysql.createPool({
  host: getRequiredEnv("DB_HOST"),
  port,
  user: getRequiredEnv("DB_USER"),
  password: getRequiredEnv("DB_PASSWORD"),
  database: getRequiredEnv("DB_NAME"),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export { pool, getRequiredEnv };
