import multer from "multer";

// Configuração de armazenamento
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB
});

export default upload;
