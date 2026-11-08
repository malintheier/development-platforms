import { Router } from "express";
import { pool } from "../db.js";
import { authenticateToken } from "../middleware/auth.js";
import type { Response } from "express";
import type { ResultSetHeader } from "mysql2";
import type { AuthLocals } from "../middleware/auth.js";
const router = Router();
router.get(
  "/",

  async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM articles");
      res.json(rows);
    } catch (error) {
      console.error("Failed to fetch articles", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
);
router.post(
  "/",
  authenticateToken,
  async (req, res: Response<unknown, AuthLocals>) => {
    try {
      if (!req.body) {
        return res.status(400).json({ error: "Request body is required" });
      }
      if (
        typeof req.body.title !== "string" ||
        typeof req.body.body !== "string" ||
        typeof req.body.category !== "string" ||
        !req.body.title.trim() ||
        !req.body.body.trim() ||
        !req.body.category.trim()
      ) {
        return res.status(400).json({
          error: "Title, body and category must be non-empty strings",
        });
      }
      const { title, body, category } = req.body;
      if (title.length > 255) {
        return res
          .status(400)
          .json({ error: "Title must not exceed 255 characters" });
      }
      if (category.length > 100) {
        return res
          .status(400)
          .json({ error: "Category must not exceed 100 characters" });
      }
      if (Buffer.byteLength(body, "utf-8") > 65535) {
        return res
          .status(400)
          .json({ error: "Body must not exceed 65535 bytes" });
      }
      const [result] = await pool.query<ResultSetHeader>(
        "INSERT INTO articles (title, body, category, submitted_by) VALUES (?, ?, ?, ?)",
        [title, body, category, res.locals.userId],
      );
      res.status(201).json({ id: result.insertId });
    } catch (error) {
      console.error("Failed to create article", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
);
export { router };
