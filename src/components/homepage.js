import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const applications = [
    { name: 'Home Healthcare Referral Summary', path: '/home-healthcare' },
    { name: 'Invoice Processing', path: '/invoice-processing' },
    { name: 'Chat with PDF', path: '/chat-pdf' },
    { name: 'Immigration Information Extraction', path: '/immigration-info' },
    { name: 'Damage Detection', path: 'http://43.205.185.17:5002/' },
  ];

  return (
    <Container maxWidth="lg" className="home-container">
      <Typography variant="h3" gutterBottom className="title">
        📂 Operisoft GenAI Projects
      </Typography>
      <Typography variant="h5" className="subtitle">
        Select an Application
      </Typography>

      <div className="button-container">
        {applications.map((app, index) => (
          <Button
            key={index}
            variant="contained"
            component={Link}
            to={app.path}
            className="app-button"
          >
            {app.name}
          </Button>
        ))}
      </div>
    </Container>
  );
};

export default HomePage;
