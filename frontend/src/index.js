import React from 'react';
import ReactDOM from 'react-dom/client';
import "leaflet/dist/leaflet.css";   // ← AQUÍ, SOLO AQUÍ
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
