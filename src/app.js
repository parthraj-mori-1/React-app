import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/homepage';
import HomeHealthcare from './pages/HomeReferralPage';
import InvoiceProcessing from './pages/invoiceprocessing';
import ChatWithPDF from './pages/chatwithpdf';
import ImmigrationInfo from './pages/immigrationinfo';
//import DamageDetection from './pages/DamageDetection';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home-healthcare" element={<HomeHealthcare />} />
        <Route path="/invoice-processing" element={<InvoiceProcessing />} />
        <Route path="/chat-pdf" element={<ChatWithPDF />} />
        <Route path="/immigration-info" element={<ImmigrationInfo />} />



      </Routes>
    </Router>
  );
}

export default App;
