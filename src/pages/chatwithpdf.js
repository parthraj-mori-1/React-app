import React, { useState } from 'react';
// import DocumentUpload from './components/documentupload';
//import ProcessingStatus from './components/chat_processingstatus';
import ProcessingStatus from '../components/chat_processingstatus';
import DocumentUpload from '../components/chat_documentupload';

import ChatInterface from '../components/chat_chatinterface';
import '../styles/chatwithpdf.css';
// import DocumentUpload from './components/documentupload';

function App() {
  const [docId, setDocId] = useState(null);
  const [processingCompleted, setProcessingCompleted] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleUploadStart = async ({ username, password, filename, pdfFile }) => {
    try {
      const response = await fetch(process.env.REACT_APP_DOCUMENT_UPLOAD,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${btoa(`${username}:${password}`)}`
          },
          body: JSON.stringify({ "filename":filename })
        }
      );

      if (!response.ok) throw new Error('Document registration failed');

      const { doc_id, presignedurl } = await response.json();
      setDocId(doc_id);

      const uploadResponse = await fetch(presignedurl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/pdf' },
        body: pdfFile
      });

      if (!uploadResponse.ok) throw new Error('PDF upload failed');
    } catch (error) {
      setUploadError(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        'https://d2i2c2xxs5.execute-api.ap-south-1.amazonaws.com/dev/documents/delete',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ "doc_id": docId })
        }
      );

      if (response.ok) {
        setDocId(null);
        setProcessingCompleted(false);
      }
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  return (
    <div className="app-container">
      <h1>💬 Chat with PDF</h1>
      
      {!docId && !processingCompleted && (
        <DocumentUpload onUploadStart={handleUploadStart} />
      )}

      {docId && !processingCompleted && (
        <ProcessingStatus
          docId={docId}
          onComplete={() => setProcessingCompleted(true)}
        />
      )}

      {processingCompleted && (
        <ChatInterface docId={docId} onDelete={handleDelete} />
      )}

      {uploadError && <div className="error-message">{uploadError}</div>}
    </div>
  );
}

export default App;