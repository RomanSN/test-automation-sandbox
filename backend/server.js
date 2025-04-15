import { loginUser, registerUser } from "./services/user-service.js";
import { getArticles, addArticle, deleteArticle, editArticle } from "./services/article-service.js";
import express, { json } from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { connectDB } from "./services/db-connection-service.js";
const jwt = await import("jsonwebtoken");
const app = express();
const PORT = 3000;
const SECRET_KEY = "supersecretkey";

dotenv.config({ path: './data/.env' });
await connectDB();
app.use(cors());
app.use(json());

// **🚀 User API**
app.post("/api/login", loginUser);
app.post("/api/signup", registerUser);

// **🚀 Articles API**
app.get("/api/articles", getArticles);
app.post("/api/articles", verifyToken, addArticle);
app.delete("/api/articles/delete/:id", verifyToken, deleteArticle);
app.put("/api/articles/edit/:id", verifyToken, editArticle);

// **🔐 Middleware for Authentication**
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Unauthorized" });

  jwt.default.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token invalid" });
    req.user = decoded;
    next();
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
