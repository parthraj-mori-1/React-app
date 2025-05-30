import { useCallback } from 'react';

export default function S3Input({ 
  file, 
  setFile,
  username,
  setUsername,
  password,
  setPassword,
  onProcess,
  loading
}) {
  const handleFileChange = useCallback((e) => {
    setFile(e.target.files[0]);
  }, [setFile]);

  const handleSubmit = useCallback(() => {
    if (!file) {
      alert('Please upload an image');
      return;
    }
    if (!username || !password) {
      alert('Please enter username and password');
      return;
    }
    onProcess(file);
  }, [file, username, password, onProcess]);

  return (
    <div className="input-container">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      
      <div className="file-upload">
        <input 
          type="file"
          accept="image/jpeg, image/png, image/jpg"
          onChange={handleFileChange}
        />
      </div>

      <button 
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Process Image'}
      </button>
    </div>
  );
}