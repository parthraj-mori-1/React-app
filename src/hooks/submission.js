import { useState, useEffect } from 'react';

export default function useJobStatus(jobId, credentials) {
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!jobId) return;

    const checkStatus = async () => {
      try {
        const response = await fetch(
          `https://k55stuxrfe.execute-api.ap-south-1.amazonaws.com/prod/result?request_id=${requestId}`,
          {
            headers: {
              Authorization: `Basic ${btoa(`${credentials.username}:${credentials.password}`)}`
            }
          }
        );

        if (!response.ok) throw new Error(response.statusText);
        
        const data = await response.json();
        
        if (data.status === 'completed' || data.results) {
          setResults(data);
          setProgress(100);
        } else {
          setProgress(prev => Math.min(prev + 20, 80));
        }
      } catch (err) {
        setError(err.message);
        clearInterval(interval);
      }
    };

    const interval = setInterval(checkStatus, 3000);
    return () => clearInterval(interval);
  }, [jobId, credentials]);

  return { progress, results, error };
}