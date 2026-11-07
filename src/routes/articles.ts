import { Router } from "express";
import { pool } from "../db.js";
const router = Router();
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM articles");
    res.json(rows);
  } catch (error) {
    console.error("Failed to fetch articles", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export { router };
