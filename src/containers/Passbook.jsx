import React from 'react';
import Login from './../components/Login/Login';
import { Switch, Route } from 'react-router';
import Home from './../components/Home/Home';
import Register from './../components/Register/Register';

const Passbook = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/" exact component={Home} />
      {/* <Route path="*" exact component={NotFound} /> */}
    </Switch>
  );
};

export default Passbook;
