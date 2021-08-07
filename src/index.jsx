import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import Amplify from 'aws-amplify'
import config from './aws-exports'
import { BrowserRouter } from 'react-router-dom';

Amplify.configure(config);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

