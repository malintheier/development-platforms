import express from "express";
import type { ErrorRequestHandler } from "express";
import { router as articlesRouter } from "./routes/articles.js";
import { router as authRouter } from "./routes/auth.js";

const app = express();
app.use(express.json());
const PORT = 3000;

app.get("/", (req, res) => {
  res.json({ message: "Hello world!" });
});
app.use("/articles", articlesRouter);
app.use("/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  if (
    typeof error === "object" &&
    error !== null &&
    "type" in error &&
    error.type === "entity.parse.failed"
  ) {
    return res.status(400).json({ error: "Invalid JSON in request body" });
  }
  if (
    typeof error === "object" &&
    error !== null &&
    "type" in error &&
    error.type === "entity.too.large"
  ) {
    return res.status(413).json({ error: "Request body too large" });
  }
  console.error(error);
  res.status(500).json({ error: "Internal Server Error" });
};
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
