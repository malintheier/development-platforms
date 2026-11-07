import express from "express";
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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
