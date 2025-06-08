import React, { useState } from 'react';

interface MessageInputProps {
  onSendMessage: (messageText: string) => void;
  disabled?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, disabled }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (event?: React.FormEvent) => {
    if (event) event.preventDefault(); // Prevent form submission if wrapped in a form
    if (inputText.trim() && !disabled) {
      onSendMessage(inputText.trim());
      setInputText('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent new line on Enter
      handleSubmit();
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={disabled ? "AI is responding..." : "Type your message..."}
        disabled={disabled}
        style={{ flexGrow: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '4px 0 0 4px' }}
      />
      <button
        onClick={() => handleSubmit()}
        disabled={disabled || !inputText.trim()}
        style={{ padding: '10px 15px', border: '1px solid #007bff', backgroundColor: '#007bff', color: 'white', borderRadius: '0 4px 4px 0', cursor: (disabled || !inputText.trim()) ? 'not-allowed' : 'pointer' }}
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
