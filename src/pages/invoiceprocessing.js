import React, { useState } from 'react';
import axios from 'axios';
import '../styles/invoice.css'; // This assumes your CSS is in App.css

function App() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResponse(null);
  };

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
    });

  const pollForResults = async (requestId, authHeader) => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_RESULT_DISPLAY}?request_id=${requestId}`,
          { headers: { Authorization: authHeader } }
        );
        const result = res.data;
        if (result.status === 'completed' || result.status === 'failed') {
          clearInterval(interval);
          setResponse(result);
          setLoading(false);
        }
      } catch (error) {
        clearInterval(interval);
        setResponse({ error: error.message });
        setLoading(false);
      }
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !username || !password) return alert('Missing inputs');

    setLoading(true);
    setResponse(null);

    const authHeader = 'Basic ' + btoa(`${username}:${password}`);

    try {
      const base64 = await convertToBase64(file);
      const body = { isBase64Encoded: true, body: base64 };

      const res = await axios.post(
        process.env.REACT_APP_INVOICE_UPLOAD,
        body,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: authHeader,
          },
        }
      );

      const { request_id } = res.data;
      if (request_id) {
        pollForResults(request_id, authHeader);
      } else {
        setResponse({ error: 'No request_id returned.' });
        setLoading(false);
      }
    } catch (error) {
      setResponse({ error: error.response?.data?.error || error.message });
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Upload Invoice Image</h1>
      <form onSubmit={handleSubmit} className="input-container">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input type="file" accept="image/*" onChange={handleFileChange} required />
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Submit'}
        </button>
      </form>

      {loading && (
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '50%' }} />
        </div>
      )}

      {response && (
        <div className="results-container">
          <h3>Response:</h3>
          <pre className="json-viewer">{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
