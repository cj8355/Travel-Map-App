// importing react and reactDom to render the APP component to index.html
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// rendering the APP component to the root div in index.html
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
