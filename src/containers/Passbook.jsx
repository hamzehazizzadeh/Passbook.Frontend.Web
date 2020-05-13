import React from 'react';
import Login from './../components/Login/Login';
import { Switch, Route } from 'react-router';
import Home from './../components/Home/Home';
import Register from './../components/Register/Register';
import AuthContext from './../components/context/AuthContext';

const Passbook = () => {
  return (
    <Switch>
      <Route
        path="/register"
        render={() => (
          <AuthContext>
            <Register />
          </AuthContext>
        )}
      />
      <Route
        path="/login"
        render={() => (
          <AuthContext>
            <Login />
          </AuthContext>
        )}
      />
      <Route path="/" exact component={Home} />
      {/* <Route path="*" exact component={NotFound} /> */}
    </Switch>
  );
};

export default Passbook;
