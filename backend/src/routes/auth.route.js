import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import upload from "../middlewares/multer.js"; // Middleware para upload

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Atualização do perfil com suporte para upload de imagem
router.put(
  "/update-profile",
  protectRoute,
  upload.single("profilePic"), // Middleware para processar o upload da imagem
  updateProfile // Controlador atualizado para lidar com o Cloudinary
);

router.get("/check", protectRoute, checkAuth);

export default router;
