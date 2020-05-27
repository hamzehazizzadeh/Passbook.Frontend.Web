import React from 'react';
import Passbook from './Passbook';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <BrowserRouter>
      <Passbook />
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
