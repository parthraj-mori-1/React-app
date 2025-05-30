import React, { useState } from 'react';

const ChatInterface = ({ docId, onDelete }) => {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async () => {
    if (!query) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(
        process.env.REACT_APP_GENERATE_CHAT_URL,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ doc_id: docId, query })
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAnswer(data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-interface">
      <h2>Document Ready!</h2>
      <p>Document ID: {docId}</p>
      
      <div className="query-section">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question about the document"
        />
        <button onClick={handleAsk} disabled={isLoading}>
          {isLoading ? 'Asking...' : 'Ask'}
        </button>
      </div>

      {answer && (
        <div className="answer-section">
          <h3>Answer:</h3>
          <pre>{JSON.stringify(answer, null, 2)}</pre>
        </div>
      )}

      <button className="delete-button" onClick={onDelete}>
        Delete Document
      </button>
    </div>
  );
};

export default ChatInterface;