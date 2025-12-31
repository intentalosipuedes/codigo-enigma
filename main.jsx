import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import OakDriverApp from './OakDriverApp';
import "leaflet/dist/leaflet.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <OakDriverApp />
  </React.StrictMode>
);
