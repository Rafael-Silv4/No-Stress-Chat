import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";
import { toast } from "react-toastify"; // Certifique-se de ter instalado e configurado o react-toastify
import "react-toastify/dist/ReactToastify.css";

const MAX_IMAGE_SIZE = 320 * 1024 * 1024; // Limite de 10MB

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validação do tamanho da imagem
    if (file.size > MAX_IMAGE_SIZE) {
      return toast.error("A imagem deve ter no máximo 10MB.");
    }

    // Validação do tipo da imagem
    const validImageTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validImageTypes.includes(file.type)) {
      return toast.error("Por favor, envie uma imagem válida (JPEG, PNG ou WEBP).");
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image); // Atualiza a visualização da imagem
      try {
        await updateProfile({ profilePic: base64Image }); // Envia para o servidor
        toast.success("Foto de perfil atualizada com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar a foto de perfil:", error);
        toast.error("Não foi possível atualizar a foto de perfil.");
      }
    };

    reader.onerror = () => {
      toast.error("Erro ao carregar a imagem. Tente novamente.");
    };
  };

  const handleImageError = () => {
    setSelectedImg("/avatar.png"); // Fallback para o avatar padrão
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Perfil</h1>
            <p className="mt-2">Informações do perfil</p>
          </div>

          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser?.profilePic || "/avatar.png"}
                alt="Profile"
                onError={handleImageError}
                className="w-32 h-32 rounded-full object-cover border-4"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Carregando..." : "Clique no ícone da câmera para atualizar sua foto"}
            </p>
          </div>

          {/* User Info */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Nome completo
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.fullName}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
            </div>
          </div>

          {/* Account Info */}
          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Informações da conta</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Ingressou em</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Status da conta</span>
                <span className="text-green-500">Ativo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
