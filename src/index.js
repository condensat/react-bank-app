import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import 'typeface-pt-serif';
import 'typeface-open-sans';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./index.css"

import App from "./App";

ReactDOM.render(
  <CookiesProvider>
    <Router>
      <App />
    </Router>
  </CookiesProvider>,
  document.getElementById('app')
);
