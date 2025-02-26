'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Send, X, Loader2 } from 'lucide-react';
import Image from 'next/image';

// Maksimum saklanacak mesaj sayısı
const MAX_STORED_MESSAGES = 10;

/**
 * Chatbot bileşeni
 * @returns {JSX.Element} Chatbot bileşeni
 */
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [currentImage, setCurrentImage] = useState("/images/chatbot/Elma.png");
  const scrollAreaRef = useRef(null);
  const [showWelcomeBubble, setShowWelcomeBubble] = useState(true);

  // Mesajları localStorage'dan yükle
  useEffect(() => {
    const storedMessages = localStorage.getItem('chatbotMessages');
    if (storedMessages) {
      const parsedMessages = JSON.parse(storedMessages);
      setMessages(parsedMessages);
    }
  }, []);

  // Mesajları localStorage'a kaydet
  useEffect(() => {
    if (messages.length > 0) {
      // Son MAX_STORED_MESSAGES kadar mesajı sakla
      const messagesToStore = messages.slice(-MAX_STORED_MESSAGES);
      localStorage.setItem('chatbotMessages', JSON.stringify(messagesToStore));
    } else {
      // Mesaj yoksa localStorage'ı temizle
      localStorage.removeItem('chatbotMessages');
    }
  }, [messages]);

  // Görsel değiştirme efekti
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === '/images/chatbot/Elma.png'
          ? '/images/chatbot/ElmaYildizli.png'
          : '/images/chatbot/Elma.png'
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Karşılama mesajı
  useEffect(() => {
    const storedMessages = localStorage.getItem('chatbotMessages');
    if (isOpen && !storedMessages && messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: 'Merhaba! Ben Amasya\'nın dijital rehberiyim. Size Amasya\'nın tarihi, kültürü, yemekleri ve gezilecek yerleri hakkında bilgi vermekten mutluluk duyarım. Ne öğrenmek istersiniz?'
        }
      ]);
    }
  }, [isOpen, messages.length]);

  // Otomatik scroll
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Mesajlar güncellendiğinde otomatik scroll
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  // Sayfa yüklendiğinde hoş geldin balonunu göster ve 5 saniye sonra gizle
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomeBubble(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage(''); // Input'u temizle
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Bir hata oluştu');
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.message }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Üzgünüm, bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Konuşmayı sıfırlama fonksiyonu
  const resetChat = () => {
    setMessages([]);
    localStorage.removeItem('chatbotMessages');
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4">
        {showWelcomeBubble && (
          <div className="absolute bottom-36 right-0 mb-2 w-64 animate-fade-in">
            <div className="relative bg-theme-primary text-theme-bg p-4 rounded-lg shadow-lg">
              <div className="absolute -bottom-2 right-12 w-4 h-4 bg-theme-primary transform rotate-45" />
              <p className="text-sm">Merhaba! Ben Amasya&apos;nın dijital rehberiyim. Size nasıl yardımcı olabilirim?</p>
            </div>
          </div>
        )}
        <button
          onClick={() => {
            setIsOpen(true);
            setShowWelcomeBubble(false);
          }}
          className="w-32 h-32 flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none group"
        >
          <div>
            <Image
              src={currentImage}
              alt="Chatbot"
              width={128}
              height={128}
              className="transition-all duration-300 group-hover:rotate-[360deg]"
            />
          </div>
        </button>
      </div>
    );
  }

  return (
    <Card className="fixed bottom-20 right-4 w-80 h-[500px] flex flex-col shadow-2xl z-[9999] border-theme-primary/20">
      {/* Header */}
      <div className="p-4 border-b border-theme-primary/20 flex items-center justify-between bg-theme-primary text-theme-bg rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 relative">
            <Image
              src={currentImage}
              alt="Chatbot"
              fill
              className="object-contain transition-opacity duration-300"
            />
          </div>
          <span className="font-medium">Amasya Rehberi</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={resetChat}
            className="hover:bg-theme-primary-hover text-theme-bg"
            title="Konuşmayı Sıfırla"
          >
            <MessageCircle className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="hover:bg-theme-primary-hover text-theme-bg"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Mesaj Listesi */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "assistant" && (
                <div className="w-6 h-6 relative mr-2 flex-shrink-0 mt-1">
                  <Image
                    src={currentImage}
                    alt="Chatbot"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.role === "user"
                    ? "bg-theme-primary text-white"
                    : "bg-gray-100"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="w-6 h-6 relative mr-2 flex-shrink-0 mt-1">
                <Image
                  src={currentImage}
                  alt="Chatbot"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="max-w-[80%] rounded-lg p-3 bg-gray-100">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Mesaj Gönderme Formu */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-theme-primary/20">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Mesajınızı yazın..."
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={isLoading || !message.trim()}
            className="bg-theme-primary hover:bg-theme-primary-hover text-white"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
} 