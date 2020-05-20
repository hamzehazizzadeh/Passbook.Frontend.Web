import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { context } from '../context/auth';
import HashLoader from 'react-spinners/HashLoader';

const Login = () => {
  const loginContext = useContext(context);

  const {
    userName,
    setUserName,
    password,
    setPassword,
    validator,
    loading,
    handleLogin,
  } = loginContext;

  return (
    <div className="rtl bg-auth">
      <Helmet>
        <title>پسبوک | ورود به حساب کاربری</title>
      </Helmet>
      <HashLoader
        css={'width:100%; position: absolute; top : 50% ;'}
        size={50}
        color={'#ff0000'}
        loading={loading}
      />

      <div className="container py-4">
        <div className="content-auth">
          <p className="title-auth">ورود به حساب کاربری</p>
          <div className="container">
            <form onSubmit={(e) => handleLogin(e)}>
              {/* User Name */}
              <div>
                <label className="d-block text-left">نام کاربری</label>
                <input
                  type="text"
                  name="userName"
                  className="form-control-auth"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                    validator.current.showMessageFor('userName');
                  }}
                />
                {validator.current.message(
                  'userName',
                  userName,
                  'required|min:5|max:20'
                )}
              </div>
              {/* Password */}
              <div>
                <label className="d-block text-left">رمز عبور</label>
                <input
                  type="password"
                  name="password"
                  className="form-control-auth"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validator.current.showMessageFor('password');
                  }}
                />
                {validator.current.message(
                  'password',
                  password,
                  'required|min:6|max:50'
                )}
              </div>
              <button type="submit" className="submit-auth">
                ورود
              </button>
            </form>
            <div className="text-left py-4">
              <div>
                <Link to="/forget-password">
                  <i className="fa fa-lock mr-2"></i>رمز عبور خود را فراموش کرده
                  ام !
                </Link>
              </div>
              <div className="mt-2">
                <Link to="/register">
                  <i className="fa fa-user mr-2"></i> عضویت در سایت
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
