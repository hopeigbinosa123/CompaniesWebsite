<<<<<<< Updated upstream
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

=======
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
export * from './auth';
const root = ReactDOM.createRoot(document.getElementById('root'));
>>>>>>> Stashed changes
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
