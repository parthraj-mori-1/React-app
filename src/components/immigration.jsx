import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Alert, Spinner, Card } from 'react-bootstrap';

const ImmigrationExtractor = () => {
  const [s3Path, setS3Path] = useState(
    process.env.REACT_APP_S3_BUCKET
  );
  const [jobId, setJobId] = useState('');
  const [statusMessages, setStatusMessages] = useState([]);
  const [result, setResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  const MAX_ATTEMPTS = 6;

  const handleSubmit = async () => {
    if (!s3Path.trim()) {
      setError('🚨 Please enter at least one S3 path.');
      return;
    }

    setIsSubmitting(true);
    setError('');
    setResult(null);
    setStatusMessages([]);

    try {
      const response = await axios.post(
        process.env.REACT_APP_SUBMIT_URL,
        { link: s3Path },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200) {
        setJobId(response.data);
        setAttempts(1);
      }
    } catch (err) {
      setError(`❌ Submission failed: ${err.response?.data || err.message}`);
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const checkStatus = async () => {
      if (!jobId || attempts > MAX_ATTEMPTS) return;

      try {
        const response = await axios.post(
          process.env.REACT_APP_STATUS_URL,
          { job_id: jobId },
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (response.status === 200) {
          setResult(response.data);
          setIsSubmitting(false);
        } else if (response.status === 202) {
  const message = response.data.message || '⏳ Processing...';
  setStatusMessages(prev => {
    if (!prev.includes(message)) {
      return [...prev, message];
    }
    return prev;
  });
  setTimeout(() => setAttempts(a => a + 1), attempts === 1 ? 6000 : 15000);
}
      } catch (err) {
        setError(`❌ Error fetching status: ${err.response?.data || err.message}`);
        setIsSubmitting(false);
      }
    };

    checkStatus();
  }, [jobId, attempts]);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">📑 Immigration Information Extraction</h1>
      
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>S3 Student Folder Path:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={s3Path}
            onChange={(e) => setS3Path(e.target.value)}
          />
        </Form.Group>

        <Button 
          variant="primary" 
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className="ms-2">Processing...</span>
            </>
          ) : (
            'Submit'
          )}
        </Button>
      </Form>

      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}

      {statusMessages.map((msg, index) => (
        <Alert key={index} variant="info" className="mt-3">
          {msg}
        </Alert>
      ))}

      {result && (
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>🎉 Job completed!</Card.Title>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </Card.Body>
        </Card>
      )}

      {attempts >= MAX_ATTEMPTS && !result && (
        <Alert variant="warning" className="mt-3">
          ⚠️ Job still in progress. Please check again later.
        </Alert>
      )}
    </div>
  );
};

export default ImmigrationExtractor;
