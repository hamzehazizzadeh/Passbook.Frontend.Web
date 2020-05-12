import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Login = () => {
  return (
    <div className="rtl bg-auth">
      <Helmet>
        <title>پسبوک | ورود به حساب کاربری</title>
      </Helmet>
      <div className="container py-4">
        <div className="content-auth">
          <p className="title-auth">ورود به حساب کاربری</p>
          <div className="container">
            <form>
              {/* User Name */}
              <div>
                <label className="d-block text-left">نام کاربری یا ایمیل</label>
                <input
                  type="text"
                  name="username"
                  className="form-control-auth"
                />
              </div>
              {/* Password */}
              <div>
                <label className="d-block text-left">رمز عبور</label>
                <input
                  type="password"
                  name="password"
                  className="form-control-auth"
                />
              </div>
              <button type="submit" className="submit-auth">
                ورود
              </button>
            </form>
            <div className="text-left py-4">
              <Link to="/forget-password">
                <i className="fa fa-lock mr-1"></i>رمز عبور خود را فراموش کرده
                ام !
              </Link>
              <br />
              <Link to="/register">
                <i className="fa fa-user mr-1"></i> عضویت در سایت
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
