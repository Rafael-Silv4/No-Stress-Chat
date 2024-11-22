import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";

config();

// Configurações do Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Garante que as URLs geradas sejam seguras (HTTPS)
});

export default cloudinary;
