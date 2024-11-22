import multer from "multer";
import path from "path";

// Configuração de armazenamento para upload de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Diretório para salvar os arquivos
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Filtro para aceitar apenas imagens
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (!allowedTypes.includes(file.mimetype)) {
    cb(new Error("Tipo de arquivo não suportado"), false);
  } else {
    cb(null, true);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
