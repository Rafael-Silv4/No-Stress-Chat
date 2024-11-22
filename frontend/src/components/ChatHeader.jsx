import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser, messages } = useChatStore(); // Supondo que as mensagens estão aqui
  const { onlineUsers } = useAuthStore();

  // Verificando se há mensagens não lidas do usuário selecionado
  const unreadMessages = messages.filter(
    (message) => message.senderId === selectedUser._id && !message.isRead
  ).length;

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Indicação de mensagem pendente */}
        {unreadMessages > 0 && (
          <div className="w-3 h-3 bg-red-500 rounded-full absolute top-2 right-2"></div>
        )}

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
