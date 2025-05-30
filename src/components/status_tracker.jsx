import { useEffect } from 'react';
import useJobStatus from '../hooks/submission';


export default function StatusTracker({ jobId, credentials, onComplete }) {
  const { progress, results, error } = useJobStatus(jobId, credentials);

  useEffect(() => {
    if (results) {
      onComplete(results);
    }
  }, [results, onComplete]);

  return (
    <div className="status-tracker">
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {error && <div className="error-message">⚠️ {error}</div>}
    </div>
  );
}