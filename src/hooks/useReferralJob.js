// File: src/hooks/useReferralJob.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const useReferralJob = (s3Paths) => {
  const [jobId, setJobId] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [polling, setPolling] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    const links = s3Paths
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean);

    if (links.length === 0) {
      setError('Please enter at least one S3 path.');
      return;
    }

    setLoading(true);
    setError(null);
    setJobId(null);
    setStatus(null);

    try {
      const response = await axios.post(
        process.env.REACT_APP_SUBMIT_API_URL,
        { links },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200) {
        setJobId(response.data.job_id);
        setPolling(true);
      } else {
        setError(`Submission failed: ${response.statusText}`);
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!jobId || !polling) return;

    const pollStatus = async (attempt = 0) => {
      if (attempt >= 6) {
        setError('Job still in progress. Please check again later.');
        setPolling(false);
        return;
      }

      try {
        const res = await axios.post(
          'process.env.REACT_APP_STATUS_API_URL',
          { job_id: jobId },
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (res.status === 200) {
          setStatus(res.data);
          setPolling(false);
        } else if (res.status === 202) {
          setTimeout(() => pollStatus(attempt + 1), attempt === 0 ? 6000 : 15000);
        } else {
          setError(`Status check failed: ${res.statusText}`);
          setPolling(false);
        }
      } catch (err) {
        setError(`Polling error: ${err.message}`);
        setPolling(false);
      }
    };

    pollStatus();
  }, [jobId, polling]);

  return {
    jobId,
    status,
    loading,
    polling,
    error,
    handleSubmit
  };
};

export default useReferralJob;
