import React, { useState } from 'react';
import { uploadFileToS3, triggerFaiss, deleteBucketContent} from '../api/api';
import '../style/FileUpload.css';

const FileUpload = ({ presignedurl, onUploadComplete }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setLoading(true);
    try {
      const bucketName = 'dovesoft-react-ap-south-1-029729715360';
      await deleteBucketContent(bucketName);

      await uploadFileToS3(presignedurl, file);

      await triggerFaiss();
      onUploadComplete();
    } catch (err) {
      console.error('Upload failed:', err);
      alert("Upload failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-box">
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          disabled={loading}
          className="upload-input"
        />
        <button onClick={handleUpload} disabled={loading} className="upload-button">
          {loading ? 'Uploading...' : 'Upload'}
        </button>
        {loading && <div className="upload-loading">Please wait...</div>}
      </div>
    </div>
  );
};

export default FileUpload;
