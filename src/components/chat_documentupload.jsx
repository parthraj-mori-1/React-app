import React, { useState } from 'react';

const DocumentUpload = ({ onUploadStart }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [filename, setFilename] = useState('demo.pdf');
  const [pdfFile, setPdfFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUploadStart({ username, password, filename, pdfFile });
  };

  return (
    <div className="upload-form">
      <h2>Upload Document</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Filename:</label>
          <input
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Upload PDF:</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdfFile(e.target.files[0])}
            required
          />
        </div>

        <button type="submit" className="primary-button">
          Start Process
        </button>
      </form>
    </div>
  );
};

export default DocumentUpload;