import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Import the context provider
import { Provider } from './Context';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root'));
