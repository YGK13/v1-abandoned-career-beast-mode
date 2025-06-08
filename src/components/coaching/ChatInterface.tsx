import React, { useState, useEffect } from 'react';
import MessageDisplayArea from './MessageDisplayArea';
import MessageInput from './MessageInput';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAiTyping, setIsAiTyping] = useState(false);

  const handleSendMessage = (messageText: string) => {
    if (messageText.trim() === '') return;

    const newUserMessage: Message = {
      id: Date.now().toString() + '-user',
      text: messageText,
      sender: 'user',
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setIsAiTyping(true);
  };

  // Effect to simulate AI response
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender === 'user') {
      const timer = setTimeout(() => {
        const aiResponse: Message = {
          id: Date.now().toString() + '-ai',
          text: "Thanks for your message! I'm still under development, but I'm learning fast!",
          sender: 'ai',
        };
        setMessages((prevMessages) => [...prevMessages, aiResponse]);
        setIsAiTyping(false);
      }, 1500); // Simulate delay for AI response

      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [messages]);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', border: '1px solid #ccc', borderRadius: '8px', padding: '16px' }}>
      <MessageDisplayArea messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} disabled={isAiTyping} />
      {isAiTyping && <p style={{ textAlign: 'center', fontSize: '0.9em', color: '#777' }}>AI is typing...</p>}
    </div>
  );
};

export default ChatInterface;
