import React, { useEffect } from 'react';
import { withRouter } from 'react-router';

const Logout = ({ history }) => {
  useEffect(() => {
    localStorage.removeItem('token');
    history.push('/');
  }, []);
};

export default withRouter(Logout);