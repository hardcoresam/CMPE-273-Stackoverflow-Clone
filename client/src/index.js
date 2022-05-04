import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import DashboardTop from './features/DashboardTopSlice';
import DashboardSecondTop from './features/DashboardSecondTopSlice';
import loginReducer from './features/login'
import registerreducer from './features/register'
import logoutReducer from './features/logout'
import User from './features/UserSlice';
import QuestionBody from './features/QuestionBodySlice'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
const root = ReactDOM.createRoot(document.getElementById('root'));


const store = configureStore({
  reducer: {
    login: loginReducer,
    register : registerreducer,
    logout : logoutReducer,
    DashboardTopSlice: DashboardTop,
    DashboardSecondTopSlice : DashboardSecondTop,
    UserSlice : User,
    QuestionBodySlice : QuestionBody
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
