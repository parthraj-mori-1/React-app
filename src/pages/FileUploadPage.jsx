import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import StatusChecker from '../components/StatusChecker';
import ChatBox from '../components/ChatBox';


const FileUploadPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [uploaded, setUploaded] = useState(false);
  const [statusDone, setStatusDone] = useState(false);
  const [presignedurl, setPresignedUrl] = useState('');
  const [docId, setDocId] = useState('');

  useEffect(() => {
    if (location.state?.presignedurl && location.state?.docId) {
      setPresignedUrl(location.state.presignedurl);
      setDocId(location.state.docId);
    } else {
      // If no state was passed, go back to the first page
      navigate('/');
    }
  }, [location.state, navigate]);

  return (
    <div>
      {!uploaded && presignedurl && (
        <FileUpload presignedurl={presignedurl} onUploadComplete={() => setUploaded(true)} />
      )}
      {uploaded && !statusDone && (
        <StatusChecker docId={docId} onCompleted={() => setStatusDone(true)} />
      )}
      {statusDone && <ChatBox docId={docId} />}
    </div>
  );
};

export default FileUploadPage;
