import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Provider store={Store}>
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </Provider>
);
