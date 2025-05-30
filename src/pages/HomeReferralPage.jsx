import React, { useState } from 'react';
import useReferralJob from '../hooks/useReferralJob';
import '../styles/healthcare.css'; // Import the CSS file

const HomeReferralPage = () => {
  const [s3Paths, setS3Paths] = useState(
    `s3://chartmate-idp1/Ayrom.WC1.pdf\ns3://chartmate-idp1/Ayrom.WC2.pdf`
  );
  const {
    jobId,
    status,
    loading,
    polling,
    error,
    handleSubmit
  } = useReferralJob(s3Paths);

  const [showResult, setShowResult] = useState(true);

  return (
    <div className="referral-container">
      <h1 className="heading">📄 Home Healthcare Referral</h1>

      <label htmlFor="s3-input" className="label">
        🧾 Paste S3 PDF links (one per line):
      </label>
      <textarea
        id="s3-input"
        rows={6}
        value={s3Paths}
        onChange={(e) => setS3Paths(e.target.value)}
        className="textarea"
        placeholder="Enter one S3 path per line"
      />

      <button onClick={handleSubmit} disabled={loading} className="button">
        {loading ? '⏳ Submitting...' : '📤 Submit'}
      </button>

      {jobId && (
        <p className="success">✅ Job submitted!</p>
      )}
      {polling && <p className="status">🔄 Checking job status...</p>}
      {error && <p className="error">❌ {error}</p>}

      {status && (
        <div className="result-section">
          <div className="result-header">
            <h3 className="result-title">🎉 Job Completed</h3>
            <button
              className="toggle-button"
              onClick={() => setShowResult(!showResult)}
            >
              {showResult ? 'Hide' : 'Show'} Results
            </button>
          </div>

          {showResult && (
            <pre className="result-box">
              {JSON.stringify(status, null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
};

export default HomeReferralPage;
