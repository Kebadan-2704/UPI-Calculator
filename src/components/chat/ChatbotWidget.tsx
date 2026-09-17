"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "bot";
  content: string;
};

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      content: "Hi! I'm the UPI Cost Assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const prompt = encodeURIComponent(userMessage.content);
      const res = await fetch(`https://chatbot.codexapi.workers.dev/?prompt=${prompt}&model=gpt-5.1`);
      
      if (!res.ok) throw new Error("API request failed");
      
      const data = await res.json();
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: data.answer || "I'm sorry, I couldn't process that response.",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chatbot API Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "bot",
          content: "Sorry, I'm having trouble connecting right now. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 60,
          height: 60,
          borderRadius: 30,
          border: "none",
          cursor: "pointer",
          display: isOpen ? "none" : "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "hsl(var(--primary-foreground))",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
          zIndex: 9999,
        }}
        className="gradient-primary"
        aria-label="Open Chat"
        aria-expanded={isOpen}
      >
        <MessageSquare size={28} />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              bottom: 24,
              right: 24,
              width: 380,
              maxWidth: "calc(100vw - 48px)",
              height: 600,
              maxHeight: "calc(100vh - 48px)",
              backgroundColor: "hsl(var(--surface))",
              borderRadius: "var(--radius-lg)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              border: "1px solid hsl(var(--border))",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              zIndex: 10000,
            }}
          >
            {/* Header */}
            <div
              className="gradient-primary"
              style={{
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "hsl(var(--primary-foreground))",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Bot size={24} />
                <span style={{ fontWeight: 600, fontSize: 16 }}>UPI Assistant</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "hsl(var(--primary-foreground))",
                  cursor: "pointer",
                  display: "flex",
                  padding: 4,
                  opacity: 0.8,
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: 20,
                display: "flex",
                flexDirection: "column",
                gap: 16,
                backgroundColor: "hsl(var(--background))",
              }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-end",
                    flexDirection: msg.role === "user" ? "row-reverse" : "row",
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: msg.role === "user" ? "hsl(var(--primary))" : "hsl(var(--muted-bg))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: msg.role === "user" ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))",
                      flexShrink: 0,
                    }}
                  >
                    {msg.role === "user" ? <User size={16} /> : <Bot size={18} />}
                  </div>
                  <div
                    style={{
                      padding: "12px 16px",
                      borderRadius: "var(--radius-md)",
                      backgroundColor: msg.role === "user" ? "hsl(var(--primary))" : "hsl(var(--surface))",
                      color: msg.role === "user" ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))",
                      border: msg.role === "user" ? "none" : "1px solid hsl(var(--border))",
                      fontSize: 14,
                      lineHeight: 1.5,
                      maxWidth: "80%",
                      wordBreak: "break-word",
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: "hsl(var(--muted-bg))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "hsl(var(--foreground))",
                    }}
                  >
                    <Bot size={18} />
                  </div>
                  <div
                    style={{
                      padding: "12px 16px",
                      borderRadius: "var(--radius-md)",
                      backgroundColor: "hsl(var(--surface))",
                      border: "1px solid hsl(var(--border))",
                      color: "hsl(var(--muted))",
                      fontSize: 14,
                    }}
                  >
                    <Loader2 size={16} className="animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div style={{ padding: 16, borderTop: "1px solid hsl(var(--border))", backgroundColor: "hsl(var(--surface))" }}>
              <form
                onSubmit={handleSend}
                style={{
                  display: "flex",
                  gap: 8,
                }}
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  style={{
                    flex: 1,
                    padding: "12px 16px",
                    borderRadius: "var(--radius-full)",
                    border: "1px solid hsl(var(--input-border))",
                    backgroundColor: "hsl(var(--background))",
                    color: "hsl(var(--foreground))",
                    fontSize: 14,
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    border: "none",
                    backgroundColor: "hsl(var(--primary))",
                    color: "hsl(var(--primary-foreground))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: input.trim() && !isLoading ? "pointer" : "not-allowed",
                    opacity: input.trim() && !isLoading ? 1 : 0.6,
                  }}
                >
                  <Send size={18} style={{ marginLeft: 2 }} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
