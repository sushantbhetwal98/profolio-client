import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './contexts/AuthContext';
import { ProfessionalContextProvider } from './contexts/ProfessionalContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProfessionalContextProvider>
        <App />
      </ProfessionalContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

