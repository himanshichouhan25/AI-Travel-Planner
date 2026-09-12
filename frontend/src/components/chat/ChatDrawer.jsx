import { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Send,
  X,
  Bot,
  User,
  Trash2,
  RefreshCw,
  Compass,
  MapPin,
  Coins,
  Luggage,
} from "lucide-react";
import { sendChatMessage } from "../../services/aiService";

// Helper component to render simple Markdown (headers, bold, bullet points, numbers)
const FormattedMessage = ({ content }) => {
  if (!content) return null;

  const lines = content.split("\n");
  const elements = [];
  let listItems = [];
  let listType = null; // 'ul' | 'ol'

  const flushList = () => {
    if (listItems.length > 0) {
      if (listType === "ol") {
        elements.push(
          <ol key={`ol-${elements.length}`} className="list-decimal pl-5 my-1.5 space-y-1">
            {listItems.map((item, idx) => (
              <li key={idx} className="text-sm leading-relaxed">
                {formatInline(item)}
              </li>
            ))}
          </ol>
        );
      } else {
        elements.push(
          <ul key={`ul-${elements.length}`} className="list-disc pl-5 my-1.5 space-y-1">
            {listItems.map((item, idx) => (
              <li key={idx} className="text-sm leading-relaxed">
                {formatInline(item)}
              </li>
            ))}
          </ul>
        );
      }
      listItems = [];
      listType = null;
    }
  };

  const formatInline = (text) => {
    // Basic inline formatting: **bold** and *italic* and `code`
    const parts = [];
    let remaining = text;
    let key = 0;

    // Regex for bold **text** or inline code `text`
    const regex = /(\*\*.*?\*\*|`.*?`)/g;
    const tokens = remaining.split(regex);

    tokens.forEach((token) => {
      if (token.startsWith("**") && token.endsWith("**") && token.length >= 4) {
        parts.push(
          <strong key={key++} className="font-semibold text-slate-900 dark:text-white">
            {token.slice(2, -2)}
          </strong>
        );
      } else if (token.startsWith("`") && token.endsWith("`") && token.length >= 2) {
        parts.push(
          <code
            key={key++}
            className="px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-slate-800 text-xs font-mono font-medium text-purple-600 dark:text-purple-400"
          >
            {token.slice(1, -1)}
          </code>
        );
      } else if (token) {
        parts.push(token);
      }
    });

    return parts.length > 0 ? parts : text;
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Check for Headers
    if (trimmed.startsWith("### ")) {
      flushList();
      elements.push(
        <h4
          key={`h4-${index}`}
          className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-2.5 mb-1"
        >
          {formatInline(trimmed.slice(4))}
        </h4>
      );
      return;
    }

    if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(
        <h3
          key={`h3-${index}`}
          className="text-base font-bold text-slate-900 dark:text-white mt-3 mb-1.5"
        >
          {formatInline(trimmed.slice(3))}
        </h3>
      );
      return;
    }

    // Check for Bullet points (- or * )
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      if (listType === "ol") flushList();
      listType = "ul";
      listItems.push(trimmed.slice(2));
      return;
    }

    // Check for Numbered lists (e.g. "1. ")
    const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (numMatch) {
      if (listType === "ul") flushList();
      listType = "ol";
      listItems.push(numMatch[2]);
      return;
    }

    // Normal paragraph or empty line
    flushList();
    if (trimmed === "") {
      elements.push(<div key={`space-${index}`} className="h-2" />);
    } else {
      elements.push(
        <p key={`p-${index}`} className="text-sm leading-relaxed mb-1">
          {formatInline(trimmed)}
        </p>
      );
    }
  });

  flushList();
  return <div className="space-y-1">{elements}</div>;
};

const SUGGESTED_QUESTIONS = [
  {
    label: "Plan a trip",
    icon: Compass,
    prompt: "Can you help me plan a 4-day trip to Goa with a budget of ₹20,000?",
  },
  {
    label: "Best destinations",
    icon: MapPin,
    prompt: "What are the best travel destinations in India to visit this season?",
  },
  {
    label: "Budget advice",
    icon: Coins,
    prompt: "How can I plan an exciting budget trip for under ₹15,000?",
  },
  {
    label: "Packing tips",
    icon: Luggage,
    prompt: "What are the essential things I should pack for a mountain trip in winter?",
  },
];

export default function ChatDrawer({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll to bottom of conversation
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Focus textarea when opened on desktop
      setTimeout(() => textareaRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMessage = { role: "user", content: text };
    const nextHistory = [...messages, userMessage];

    // Optimistically update conversation UI
    setMessages(nextHistory);
    setInputMessage("");
    setIsLoading(true);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      // Send conversation history to backend for conversational memory
      const responseData = await sendChatMessage(text, messages);
      const botMessage = {
        role: "assistant",
        content: responseData.response || "No response received.",
      };
      setMessages([...nextHistory, botMessage]);
    } catch (err) {
      const errorMessage = {
        role: "assistant",
        content:
          err.message ||
          "Sorry, I couldn't process that request right now. Please try again.",
        isError: true,
      };
      setMessages([...nextHistory, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTextareaInput = (e) => {
    setInputMessage(e.target.value);
    // Auto-adjust height up to 120px
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay for mobile screens */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 sm:hidden transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Chat Drawer / Popup */}
      <div
        className="
          fixed
          z-50
          inset-x-0
          bottom-0
          top-14
          sm:inset-auto
          sm:bottom-28
          sm:right-8
          w-full
          sm:w-[420px]
          sm:max-w-[calc(100vw-2rem)]
          h-[calc(100vh-3.5rem)]
          sm:h-[620px]
          sm:max-h-[82vh]
          flex
          flex-col
          bg-white
          dark:bg-slate-900
          text-slate-800
          dark:text-slate-100
          border
          border-slate-200
          dark:border-slate-800
          rounded-t-3xl
          sm:rounded-3xl
          shadow-2xl
          overflow-hidden
          transition-all
          duration-300
          animate-in
          fade-in
          slide-in-from-bottom-6
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
              <Bot size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-slate-900 dark:text-white text-base">
                  AI Travel Assistant
                </h3>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                  <span className="w-1.5 h-1.5 mr-1 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Your intelligent travel companion
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {messages.length > 0 && (
              <button
                onClick={handleClearChat}
                title="Clear Conversation"
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Trash2 size={17} />
              </button>
            )}
            <button
              onClick={onClose}
              title="Close Assistant"
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.length === 0 ? (
            /* Empty State */
            <div className="h-full flex flex-col justify-center items-center text-center px-3 py-6 space-y-5 animate-fade-in">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-purple-100 to-indigo-100 dark:from-purple-950/50 dark:to-indigo-950/50 flex items-center justify-center text-purple-600 dark:text-purple-400 shadow-inner">
                <Sparkles size={32} />
              </div>

              <div className="space-y-1.5 max-w-xs">
                <h4 className="font-semibold text-slate-800 dark:text-slate-100 text-lg">
                  How can I help you today?
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Hi! I'm your AI Travel Assistant. Ask me anything about travel,
                  destinations, budgets, itineraries, weather, or general
                  questions.
                </p>
              </div>

              {/* Suggested Chips */}
              <div className="w-full max-w-sm space-y-2 pt-2">
                <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500 text-left px-1">
                  Suggested Questions
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {SUGGESTED_QUESTIONS.map((chip, index) => {
                    const Icon = chip.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => handleSendMessage(chip.prompt)}
                        className="
                          flex items-center gap-2 p-2.5 rounded-2xl text-left text-xs
                          bg-slate-50 dark:bg-slate-800/60
                          hover:bg-purple-50 dark:hover:bg-purple-950/40
                          border border-slate-200/80 dark:border-slate-800
                          hover:border-purple-300 dark:hover:border-purple-700
                          text-slate-700 dark:text-slate-200
                          transition-all duration-200
                          group cursor-pointer
                        "
                      >
                        <span className="p-1 rounded-lg bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 group-hover:scale-110 transition-transform">
                          <Icon size={14} />
                        </span>
                        <span className="font-medium truncate">{chip.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* Conversation messages */
            <>
              {messages.map((msg, index) => {
                const isUser = msg.role === "user";

                return (
                  <div
                    key={index}
                    className={`flex items-start gap-2.5 ${
                      isUser ? "justify-end" : "justify-start"
                    } animate-fade-in`}
                  >
                    {!isUser && (
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex-shrink-0 flex items-center justify-center text-white shadow-sm mt-0.5">
                        <Bot size={16} />
                      </div>
                    )}

                    <div
                      className={`
                        max-w-[85%]
                        sm:max-w-[78%]
                        rounded-2xl
                        px-4
                        py-3
                        shadow-sm
                        text-sm
                        ${
                          isUser
                            ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-xs"
                            : msg.isError
                            ? "bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 rounded-tl-xs"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/60 dark:border-slate-700/60 rounded-tl-xs"
                        }
                      `}
                    >
                      {isUser ? (
                        <p className="whitespace-pre-wrap leading-relaxed">
                          {msg.content}
                        </p>
                      ) : (
                        <FormattedMessage content={msg.content} />
                      )}
                    </div>

                    {isUser && (
                      <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-700 flex-shrink-0 flex items-center justify-center text-slate-600 dark:text-slate-300 shadow-sm mt-0.5">
                        <User size={16} />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Loading / Typing Indicator */}
              {isLoading && (
                <div className="flex items-start gap-2.5 justify-start animate-fade-in">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex-shrink-0 flex items-center justify-center text-white shadow-sm mt-0.5">
                    <Bot size={16} />
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 rounded-2xl rounded-tl-xs px-4 py-3 shadow-sm flex items-center gap-2">
                    <div className="flex gap-1.5 py-1">
                      <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" />
                    </div>
                    <span className="text-xs text-slate-400 dark:text-slate-500 ml-1">
                      Assistant is thinking...
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Area */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="relative flex items-end gap-2 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-1.5 focus-within:border-purple-500 dark:focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/20 transition-all">
            <textarea
              ref={textareaRef}
              value={inputMessage}
              onChange={handleTextareaInput}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              rows={1}
              placeholder="Ask anything about your trip or plans..."
              className="
                flex-1
                bg-transparent
                border-0
                outline-none
                resize-none
                px-2.5
                py-1.5
                text-sm
                text-slate-800
                dark:text-slate-100
                placeholder:text-slate-400
                dark:placeholder:text-slate-500
                max-h-[120px]
                leading-relaxed
              "
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || isLoading}
              className="
                p-2.5
                rounded-xl
                bg-gradient-to-r
                from-purple-600
                to-indigo-600
                text-white
                disabled:opacity-40
                disabled:cursor-not-allowed
                hover:opacity-95
                hover:shadow-md
                hover:shadow-purple-500/20
                active:scale-95
                transition-all
                cursor-pointer
                flex-shrink-0
              "
              title="Send message (Enter)"
            >
              {isLoading ? (
                <RefreshCw size={17} className="animate-spin" />
              ) : (
                <Send size={17} />
              )}
            </button>
          </div>
          <div className="flex justify-between items-center px-2 pt-1.5 text-[10px] text-slate-400 dark:text-slate-500">
            <span>
              Press <kbd className="font-semibold">Enter ↵</kbd> to send,{" "}
              <kbd className="font-semibold">Shift + Enter</kbd> for new line
            </span>
            <span>Powered by Groq</span>
          </div>
        </div>
      </div>
    </>
  );
}
