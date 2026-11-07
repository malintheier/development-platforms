import express from "express";
import { router as articlesRouter } from "./routes/articles.js";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.json({ message: "Hello world!" });
});
app.use("/articles", articlesRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
