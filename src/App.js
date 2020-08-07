import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Login from './component/Login/Login';
// import './App.css';

function App(props) {

  return (
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
}

export default App;
