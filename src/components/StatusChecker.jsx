import React, { useEffect } from 'react';
import { getStatus } from '../api/api';
import '../style/StatusChecker.css';

const StatusChecker = ({ docId, onCompleted }) => {
  useEffect(() => {
    const interval = setInterval(async () => {
      const status = await getStatus(docId);
      console.log('Polled status:', status);
      if (status === 'Completed') {
        clearInterval(interval);
        onCompleted();
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [docId, onCompleted]);

  return (
    <div className="status-checker-container">
      Processing... Please wait.
      <div className="spinner" />
    </div>
  );
};

export default StatusChecker;
