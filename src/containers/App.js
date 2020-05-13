import React from 'react';
import Passbook from './Passbook';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';

const App = () => {
  return (
    <BrowserRouter>
      <Passbook />
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
