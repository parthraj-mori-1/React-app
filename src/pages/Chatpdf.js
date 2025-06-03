import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UploadPage from './UploadPage';
import FileUploadPage from './FileUploadPage';

const Chatpdf = () => {
  return (
    <Routes>
      <Route path="/" element={<UploadPage />} />
      <Route path="upload" element={<FileUploadPage />} />
    </Routes>
  );
};

export default Chatpdf;
