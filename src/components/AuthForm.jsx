import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPresignedUrl } from '../api/api';
import '../styles/AuthForm.css';

const AuthForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [filename, setFilename] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await getPresignedUrl(username, password, filename);
      if (data?.presignedurl && data?.doc_id) {
        navigate('upload', {
          state: {
            presignedurl: data.presignedurl,
            docId: data.doc_id,
          },
        });
      } else {
        alert("Failed to get presigned URL");
      }
    } catch (err) {
      console.error(err);
      alert("Error getting presigned URL");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Document Upload Login</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input
          type="text"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          placeholder="Filename (e.g., myfile.pdf)"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AuthForm;
