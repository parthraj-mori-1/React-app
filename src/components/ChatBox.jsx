import React, { useState } from 'react';
import { sendQuestion } from '../api/api';
import '../style/ChatBox.css'; // we’ll define this next

const ChatBox = ({ docId }) => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);

  const handleAsk = async () => {
    if (!question.trim()) return;
    const userMsg = { type: 'user', text: question };
    setMessages((prev) => [...prev, userMsg]);

    setQuestion('');
    try {
      const answer = await sendQuestion(docId, question);
      const botMsg = { type: 'bot', text: answer };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errMsg = { type: 'bot', text: 'Error getting response.' };
      setMessages((prev) => [...prev, errMsg]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAsk();
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.type === 'user' ? 'user-message' : 'bot-message'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your question..."
        />
        <button onClick={handleAsk}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
