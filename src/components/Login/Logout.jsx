import { useEffect } from 'react';
import { withRouter } from 'react-router';
import { logoutUser } from './../../services/userService';

const Logout = ({ history }) => {
  useEffect(() => {
    let token = localStorage.getItem('token');
    logoutUser(token);
    localStorage.removeItem('token');
    history.push('/');
    window.location.reload(true);
  });

  return null;
};

export default withRouter(Logout);
