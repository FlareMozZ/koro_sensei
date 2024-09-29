import React, { useState } from 'react';
import './App.css';
import ReactMarkdown from 'react-markdown';

function App() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (query.trim()) {
      const newMessage = { text: query, type: 'user' };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
  
      try {
        const response = await fetch('http://localhost:5000/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: query,
            history: messages.map((msg) => ({
              role: msg.type === 'user' ? 'user' : 'model',
              text: msg.text,
            })),
          }),
        });
  
        const data = await response.json();
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.response, type: 'model' },
        ]);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  
    setQuery('');
  };
  

  return (
    <div className="chat-container">
      <div className="chat-window">
        {messages.map((message, index) => (
          <div className={`message-row ${message.type}`} key={index}>
            {message.type === 'model' && (
              <img src="/hellyeahkoro.png" alt="Koro" className="koro-avatar" />
            )}
            <div className={`text-bubble ${message.type}`}>
            <ReactMarkdown>{message.text}</ReactMarkdown> {/* Render using react-markdown */}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="input-container">
        <input
          type="text"
          className="input-field"
          placeholder="Enter your question..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="submit-btn">Send</button>
      </form>
    </div>
  );
}

export default App;
