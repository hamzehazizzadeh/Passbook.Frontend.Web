import React, { useEffect, useState } from 'react';
import Login from './../components/Login/Login';
import Home from './../components/Home/Home';
import Register from './../components/Register/Register';
import AuthContext from './../components/context/AuthContext';
import Logout from '../components/Login/Logout';
import NotFound from './../components/NotFound/NotFound';
import { isEmpty } from 'lodash';
import { Switch, Route, Redirect } from 'react-router';
import { decodeToken } from './../utils/decodeToken';
import { logoutUser } from './../services/userService';
import ForgetPassword from './../components/Register/ForgetPassword';

const Passbook = () => {
  const [user, setUser] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = decodeToken(token);
      const dateNow = Date.now() / 1000;

      if (decodedToken.payload.exp < dateNow) {
        localStorage.removeItem('token');
        logoutUser(decodeToken.payload.unique_name);
        setUser('');
      } else setUser(decodedToken.payload.unique_name);
    }
  }, []);

  return (
    <Switch>
      {/* Home Component */}
      <Route
        path="/home"
        render={() =>
          isEmpty(user) ? (
            <Redirect to="/" />
          ) : (
            <AuthContext>
              <Home />
            </AuthContext>
          )
        }
      />
      {/* Register Component */}
      <Route
        path="/register"
        render={() =>
          isEmpty(user) ? (
            <AuthContext>
              <Register />
            </AuthContext>
          ) : (
            <Redirect to="/home" />
          )
        }
      />
      {/* Forget Password Component */}
      <Route
        path="/forget-password"
        render={() =>
          isEmpty(user) ? (
            <AuthContext>
              <ForgetPassword />
            </AuthContext>
          ) : (
            <Redirect to="/home" />
          )
        }
      />
      {/* Log Out Component */}
      <Route
        path="/logout"
        render={() => (isEmpty(user) ? <Redirect to="/" /> : <Logout />)}
      />
      {/* Login Component */}
      <Route
        path="/"
        exact
        render={() =>
          isEmpty(user) ? (
            <AuthContext>
              <Login />
            </AuthContext>
          ) : (
            <Redirect to="/home" />
          )
        }
      />
      <Route path="*" exact component={NotFound} />
    </Switch>
  );
};

export default Passbook;
