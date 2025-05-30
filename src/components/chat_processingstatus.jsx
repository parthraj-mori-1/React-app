import React, { useEffect } from 'react';

const ProcessingStatus = ({ docId, onComplete }) => {
  useEffect(() => {
    const checkStatus = async () => {
      const statusUrl = process.env.REACT_APP_DOCUMENT_STATUS_URL;
      
      for (let i = 0; i < 20; i++) {
        try {
          const response = await fetch(statusUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ doc_id: docId })
          });
          
          if (response.ok) {
            const status = await response.text();
            if (status.toLowerCase() === 'completed') {
              onComplete();
              return;
            }
          }
          
          await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (error) {
          console.error('Status check failed:', error);
          break;
        }
      }
      alert('Processing did not complete in time');
    };

    checkStatus();
  }, [docId, onComplete]);

  return (
    <div className="processing-status">
      <h3>Processing Document...</h3>
      <div className="spinner"></div>
      <p>Document ID: {docId}</p>
    </div>
  );
};

export default ProcessingStatus;