import { useState, useEffect, useRef } from "react";
import terraGuia from "../../assets/terra-guia.png";
import craftFooter from "../../assets/craft-footer.png";
import biblio from "../../assets/biblio.png";
import { playClickSound } from "../../utils/soundUtils";
import { chatService } from "../../services/chatService";

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [message, setMessage] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      time: "17:43",
      type: "system",
      content: "Servidor online",
    },
    {
      time: "17:43",
      player: "Caroline",
      content: "Obrigada por visitar meu projeto Minecraft!",
      color: "text-yellow-400",
    },
    {
      time: "17:44",
      type: "info",
      content: "Conexão estável • Ping: 0ms • FPS: 60 • Dia 256",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [typingUsers, setTypingUsers] = useState([]);
  const chatContainerRef = useRef(null);
  const subscriptionRef = useRef(null);
  const typingSubscriptionRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Carregar mensagens e configurar subscription ao montar
  useEffect(() => {
    const initializeChat = async () => {
      setIsLoading(true);

      // Carregar mensagens existentes
      const existingMessages = await chatService.getMessages();
      const formattedMessages = existingMessages.map((msg) =>
        chatService.formatMessage(msg)
      );

      // Combinar mensagens padrão com mensagens do banco
      const systemMessages = [
        {
          time: "17:43",
          type: "system",
          content: "Servidor online",
        },
        {
          time: "17:43",
          player: "Caroline",
          content: "Obrigada por visitar meu projeto Minecraft!",
          color: "text-yellow-400",
        },
        {
          time: "17:44",
          type: "info",
          content: "Conexão estável • Ping: 0ms • FPS: 60 • Dia 256",
        },
      ];

      setChatMessages([...systemMessages, ...formattedMessages]);
      setIsLoading(false);

      // Configurar subscription para atualizações em tempo real
      subscriptionRef.current = chatService.subscribeToMessages(
        (newMessage) => {
          const formattedMessage = chatService.formatMessage(newMessage);
          setChatMessages((prev) => [...prev, formattedMessage]);
        }
      );

      // Configurar subscription para indicadores de digitação
      typingSubscriptionRef.current = chatService.subscribeToTypingIndicators(
        (typingData) => {
          const { player_name, is_typing } = typingData;

          // Não mostrar nosso próprio indicador de digitação
          if (player_name === playerName) return;

          setTypingUsers((prev) => {
            if (is_typing) {
              // Adicionar usuário digitando se não estiver na lista
              if (!prev.find((user) => user.name === player_name)) {
                return [...prev, { name: player_name, timestamp: Date.now() }];
              }
              return prev;
            } else {
              // Remover usuário da lista de digitando
              return prev.filter((user) => user.name !== player_name);
            }
          });

          // Remover automaticamente após 5 segundos de inatividade
          if (is_typing) {
            setTimeout(() => {
              setTypingUsers((prev) =>
                prev.filter(
                  (user) =>
                    user.name !== player_name ||
                    Date.now() - user.timestamp > 5000
                )
              );
            }, 5000);
          }
        }
      );
    };

    initializeChat();

    // Cleanup: remover subscriptions ao desmontar
    return () => {
      if (subscriptionRef.current) {
        chatService.unsubscribe(subscriptionRef.current);
      }
      if (typingSubscriptionRef.current) {
        chatService.unsubscribe(typingSubscriptionRef.current);
      }
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  // Auto-scroll para a última mensagem
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !playerName.trim()) return;

    // Tocar som do Minecraft
    playClickSound();

    try {
      // Enviar mensagem para o Supabase
      const result = await chatService.sendMessage(playerName, message);

      if (result) {
        console.log("Mensagem enviada com sucesso:", result);
        // A mensagem aparecerá automaticamente via subscription
      } else {
        console.error("Erro ao enviar mensagem");
        // Fallback: adicionar localmente se falhar
        const newMessage = {
          time: formatTime(currentTime),
          player: playerName,
          content: message,
          color: "text-cyan-400",
        };
        setChatMessages((prev) => [...prev, newMessage]);
      }
    } catch (error) {
      console.error("Erro no envio da mensagem:", error);

      // Fallback: adicionar localmente
      const newMessage = {
        time: formatTime(currentTime),
        player: playerName,
        content: message,
        color: "text-cyan-400",
      };
      setChatMessages((prev) => [...prev, newMessage]);
    }

    setMessage("");
    setIsTyping(false);

    // Enviar indicador de que parou de digitar
    if (playerName.trim()) {
      chatService.sendTypingIndicator(playerName, false);
    }

    // Limpar timeout de digitação
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);
    const isCurrentlyTyping = e.target.value.length > 0;
    setIsTyping(isCurrentlyTyping);

    // Enviar indicador de digitação se tivermos um nome de jogador
    if (playerName.trim()) {
      chatService.sendTypingIndicator(playerName, isCurrentlyTyping);

      // Limpar o timeout anterior
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Se está digitando, configurar timeout para parar o indicador após 2 segundos de inatividade
      if (isCurrentlyTyping) {
        typingTimeoutRef.current = setTimeout(() => {
          chatService.sendTypingIndicator(playerName, false);
          setIsTyping(false);
        }, 2000);
      }
    }
  };

  return (
    <footer className="bg-[#1A1A1A] relative py-6">
      {/* Grid pattern subtle */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(100,100,100,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100,100,100,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "16px 16px",
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Layout em duas seções: Info Cards + Chat */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Seção esquerda: Cards de informação */}
          <div className="lg:w-2/5">
            <div className="grid gap-4">
              {/* Crafting Table */}
              <div
                className="bg-black/70 border-2 border-gray-600 p-4"
                style={{
                  boxShadow: "inset -2px -2px 0 0 #000, inset 2px 2px 0 0 #666",
                  imageRendering: "pixelated",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={craftFooter}
                    alt="Craft Footer"
                    className="w-5 h-5"
                    style={{ imageRendering: "pixelated" }}
                  />
                  <h3 className="text-white font-bold text-base">CRAFTING</h3>
                </div>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
                    <div
                      className="w-3 h-3 bg-blue-500 border border-blue-700"
                      style={{ imageRendering: "pixelated" }}
                    ></div>
                    <span>React & Vite</span>
                  </div>
                  <div className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
                    <div
                      className="w-3 h-3 bg-cyan-500 border border-cyan-700"
                      style={{ imageRendering: "pixelated" }}
                    ></div>
                    <span>Tailwind CSS</span>
                  </div>
                  <div className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
                    <div
                      className="w-3 h-3 bg-purple-500 border border-purple-700"
                      style={{ imageRendering: "pixelated" }}
                    ></div>
                    <span>JavaScript Magic</span>
                  </div>
                </div>
              </div>

              {/* Player Info e Multiplayer lado a lado */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Player Info */}
                <div
                  className="bg-black/70 border-2 border-gray-600 p-4"
                  style={{
                    boxShadow:
                      "inset -2px -2px 0 0 #000, inset 2px 2px 0 0 #666",
                    imageRendering: "pixelated",
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <img
                      src={terraGuia}
                      alt="Terra"
                      className="w-5 h-5"
                      style={{ imageRendering: "pixelated" }}
                    />
                    <h3 className="text-white font-bold text-sm">
                      PLAYER INFO
                    </h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <div className="text-gray-400 text-xs">
                        Nome do Jogador
                      </div>
                      <div className="text-white font-bold">
                        Caroline Castro
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs">
                        Especialização
                      </div>
                      <div className="text-yellow-400 font-bold">
                        Frontend Developer
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs">Modo de Jogo</div>
                      <div className="text-green-400 font-bold">CRIATIVO</div>
                    </div>
                  </div>
                </div>

                {/* Multiplayer */}
                <div
                  className="bg-black/70 border-2 border-gray-600 p-4"
                  style={{
                    boxShadow:
                      "inset -2px -2px 0 0 #000, inset 2px 2px 0 0 #666",
                    imageRendering: "pixelated",
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <img
                      src={biblio}
                      alt="Biblio"
                      className="w-5 h-5"
                      style={{ imageRendering: "pixelated" }}
                    />
                    <h3 className="text-white font-bold text-sm">
                      MULTIPLAYER
                    </h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <a
                      href="https://www.linkedin.com/in/caroline-santos-castro/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group"
                    >
                      <div
                        className="w-3 h-3 bg-blue-600 border border-blue-800 group-hover:bg-blue-500"
                        style={{ imageRendering: "pixelated" }}
                      ></div>
                      <span>LinkedIn Server</span>
                    </a>
                    <a
                      href="https://portifolio-caroline-castro.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors group"
                    >
                      <div
                        className="w-3 h-3 bg-purple-600 border border-purple-800 group-hover:bg-purple-500"
                        style={{ imageRendering: "pixelated" }}
                      ></div>
                      <span>Portfolio World</span>
                    </a>
                    <div className="flex items-center gap-2 text-green-400">
                      <div
                        className="w-3 h-3 bg-green-600 border border-green-800"
                        style={{ imageRendering: "pixelated" }}
                      ></div>
                      <span>Status: Online</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Seção direita: Chat */}
          <div className="lg:w-3/5">
            <div
              className="bg-black/80 border-2 border-gray-600 font-mono h-full flex flex-col"
              style={{
                boxShadow: "inset -2px -2px 0 0 #000, inset 2px 2px 0 0 #666",
                imageRendering: "pixelated",
                height: "340px", // Altura fixa alinhada com as caixas da esquerda
              }}
            >
              {/* Chat Header */}
              <div className="bg-black/60 border-b border-gray-600 p-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      isLoading
                        ? "bg-yellow-500 animate-spin"
                        : "bg-green-500 animate-pulse"
                    }`}
                  ></div>
                  <span className="text-green-400 font-bold text-sm">
                    MINECRAFT CHAT
                  </span>
                  <span className="text-gray-500 text-xs ml-auto">
                    {isLoading ? "Conectando..." : "Chat em tempo real!"}
                  </span>
                </div>
              </div>

              {/* Chat Messages */}
              <div
                ref={chatContainerRef}
                className="flex-1 p-4 overflow-y-auto space-y-2 min-h-0"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#4a5568 #1a202c",
                }}
              >
                <style>{`
                  div::-webkit-scrollbar {
                    width: 8px;
                  }
                  div::-webkit-scrollbar-track {
                    background: #1a202c;
                    border-radius: 4px;
                  }
                  div::-webkit-scrollbar-thumb {
                    background: #4a5568;
                    border-radius: 4px;
                    border: 1px solid #2d3748;
                  }
                  div::-webkit-scrollbar-thumb:hover {
                    background: #718096;
                  }
                `}</style>

                {isLoading && (
                  <div className="flex items-center justify-center py-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <span className="text-sm ml-2">
                        Carregando mensagens...
                      </span>
                    </div>
                  </div>
                )}

                {!isLoading &&
                  chatMessages.map((msg, index) => (
                    <div
                      key={msg.id || `${msg.time}-${index}`}
                      className="flex items-start gap-2 hover:bg-black/20 p-1 rounded transition-colors"
                    >
                      <span className="text-gray-500 text-xs flex-shrink-0 mt-0.5">
                        [{msg.time}]
                      </span>
                      {msg.type === "system" && (
                        <span className="text-green-400 text-sm">
                          [SISTEMA] {msg.content}
                        </span>
                      )}
                      {msg.type === "info" && (
                        <span className="text-green-400 text-sm">
                          [INFO] {msg.content}
                        </span>
                      )}
                      {msg.player && (
                        <>
                          <span
                            className={`${msg.color} font-bold text-sm flex-shrink-0`}
                          >
                            &lt;{msg.player}&gt;
                          </span>
                          <span className="text-white text-sm break-words">
                            {msg.content}
                          </span>
                        </>
                      )}
                    </div>
                  ))}

                {/* Mostrar indicadores de digitação de outros usuários */}
                {typingUsers.map((user, index) => (
                  <div
                    key={`typing-${user.name}-${index}`}
                    className="flex items-start gap-2 text-gray-400 italic text-sm animate-pulse"
                  >
                    <span className="text-gray-500 text-xs flex-shrink-0 mt-0.5">
                      [{formatTime(currentTime)}]
                    </span>
                    <span className="text-yellow-300 flex items-center gap-1">
                      &lt;{user.name}&gt; está digitando
                      <div className="flex gap-1">
                        <div className="w-1 h-1 bg-yellow-300 rounded-full animate-bounce"></div>
                        <div
                          className="w-1 h-1 bg-yellow-300 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-1 h-1 bg-yellow-300 rounded-full animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </span>
                  </div>
                ))}

                {/* Mostrar nosso próprio indicador de digitação (apenas localmente) */}
                {isTyping && playerName.trim() && (
                  <div className="flex items-start gap-2 text-gray-400 italic text-sm animate-pulse">
                    <span className="text-gray-500 text-xs flex-shrink-0 mt-0.5">
                      [{formatTime(currentTime)}]
                    </span>
                    <span className="text-cyan-300">
                      &lt;{playerName}&gt; está digitando...
                    </span>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="border-t-2 border-gray-600 bg-black/60 p-3">
                <form onSubmit={handleSendMessage} className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    className="w-full sm:w-32 px-3 py-2 bg-black/70 border-2 border-gray-700 text-white text-sm font-mono placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:bg-black/80 transition-all"
                    style={{ imageRendering: "pixelated" }}
                  />
                  <div className="flex gap-2 sm:gap-3 flex-1">
                    <input
                      type="text"
                      placeholder="Compartilhe sua experiência com o projeto..."
                      value={message}
                      onChange={handleTyping}
                      className="flex-1 px-3 py-2 bg-black/70 border-2 border-gray-700 text-white text-sm font-mono placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:bg-black/80 transition-all min-w-0"
                      style={{ imageRendering: "pixelated" }}
                    />
                    <button
                      type="submit"
                      className="px-3 sm:px-4 py-2 bg-green-700 hover:bg-green-600 border-2 border-green-800 hover:border-green-700 text-white text-xs sm:text-sm font-bold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center flex-shrink-0"
                      style={{
                        imageRendering: "pixelated",
                        paddingTop: "10px",
                        paddingBottom: "6px",
                      }}
                      disabled={!message.trim() || !playerName.trim()}
                    >
                      SEND
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-6 pt-4 border-t border-gray-700/50">
          <div className="text-gray-500 text-sm font-mono">
            © {new Date().getFullYear()} Caroline Castro • Minecraft Experience
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
