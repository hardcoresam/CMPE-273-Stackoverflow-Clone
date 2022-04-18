import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import DashboardTop from './features/DashboardTopSlice';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
const root = ReactDOM.createRoot(document.getElementById('root'));


const store = configureStore({
  reducer: {
    DashboardTopSlice: DashboardTop,
  },
})

root.render(
  <React.StrictMode>
  <BrowserRouter>
  <Provider store={store}>
  <App />
  </Provider>
  </BrowserRouter>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
