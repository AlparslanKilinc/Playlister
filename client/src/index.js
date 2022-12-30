import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {disableReactDevTools} from 'react-router-dom';

/// Disable react dev tools when in production 
if(ProcessingInstruction.env.NODE_ENV === 'production') disableReactDevTools()

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>  
      <App />
  </React.StrictMode>
);


reportWebVitals();