import { Router } from "express";
import { pool } from "../db.js";
import bcrypt from "bcrypt";
const router = Router();
router.post("/register", async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is required" });
  }
  const { email, password } = req.body;
  if (
    !email ||
    !password ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return res
      .status(400)
      .json({ error: "Email and password must be non-empty strings" });
  }
  const normalizedEmail = email.trim().toLowerCase();
  if (
    !normalizedEmail ||
    normalizedEmail.length > 255 ||
    normalizedEmail.split("@").length !== 2 ||
    normalizedEmail.startsWith("@") ||
    normalizedEmail.endsWith("@") ||
    normalizedEmail.includes(" ")
  ) {
    return res.status(400).json({
      error:
        "Email must contain between 1 and 255 characters and include an '@' symbol",
    });
  }
  const domain = normalizedEmail.split("@")[1];
  if (
    !domain ||
    !domain.includes(".") ||
    domain.includes("..") ||
    domain.startsWith(".") ||
    domain.endsWith(".")
  ) {
    return res.status(400).json({
      error: "Email must have a valid domain",
    });
  }
  if (password.length < 8) {
    return res.status(400).json({
      error: "Password must be at least 8 characters long",
    });
  }
  if (Buffer.byteLength(password, "utf8") > 72) {
    return res.status(400).json({
      error: "Password must not exceed 72 bytes",
    });
  }
  if (!/[A-Z]/.test(password)) {
    return res.status(400).json({
      error: "Password must contain at least one uppercase letter",
    });
  }
  if (!/[a-z]/.test(password)) {
    return res.status(400).json({
      error: "Password must contain at least one lowercase letter",
    });
  }
  if (!/[0-9]/.test(password)) {
    return res.status(400).json({
      error: "Password must contain at least one digit",
    });
  }
  if (!/[!@#$%&*?_-]/.test(password)) {
    return res.status(400).json({
      error:
        "Password must contain at least one of these special characters: !@#$%&*?_-",
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query("INSERT INTO users (email, password_hash) VALUES (?, ?)", [
      normalizedEmail,
      hashedPassword,
    ]);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error) {
      if (error.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ error: "Email is already registered" });
      }
    }
    console.error("Failed to register user", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export { router };
