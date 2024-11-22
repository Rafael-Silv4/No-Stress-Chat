import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

// Middleware para parsear JSON com limite ajustado
app.use(express.json({ limit: "320mb" }));
app.use(express.urlencoded({ limit: "320mb", extended: true }));

// Middleware para cookies e CORS
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Rotas da aplicação
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Configuração para produção
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Inicializar o servidor
server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
