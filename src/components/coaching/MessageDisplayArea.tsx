import React from 'react';
import { Message } from './ChatInterface'; // Assuming Message interface is exported

interface MessageDisplayAreaProps {
  messages: Message[];
}

const MessageDisplayArea: React.FC<MessageDisplayAreaProps> = ({ messages }) => {
  return (
    <div style={{ height: '400px', overflowY: 'auto', marginBottom: '16px', padding: '10px', border: '1px solid #eee', borderRadius: '4px' }}>
      {messages.length === 0 && <p>No messages yet. Say hello!</p>}
      {messages.map((msg) => (
        <div
          key={msg.id}
          style={{
            marginBottom: '10px',
            padding: '8px 12px',
            borderRadius: '18px',
            maxWidth: '70%',
            wordWrap: 'break-word',
            alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            marginLeft: msg.sender === 'user' ? 'auto' : '0',
            marginRight: msg.sender === 'ai' ? 'auto' : '0',
            backgroundColor: msg.sender === 'user' ? '#007bff' : '#e9ecef',
            color: msg.sender === 'user' ? 'white' : 'black',
          }}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
};

export default MessageDisplayArea;
