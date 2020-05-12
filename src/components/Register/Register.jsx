import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="rtl bg-auth">
      <Helmet>
        <title>پسبوک | ساخت حساب کاربری جدید</title>
      </Helmet>
      <div className="container py-4">
        <div className="content-auth">
          <p className="title-auth">ساخت حساب کاربری جدید</p>
          <div className="container">
            <form>
              {/* User Name */}
              <div>
                <label className="d-block text-left">نام کاربری</label>
                <input
                  type="text"
                  name="username"
                  className="form-control-auth"
                />
              </div>
              {/* Email */}
              <div>
                <label className="d-block text-left">ایمیل</label>
                <input
                  type="email"
                  name="email"
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
              {/* Password Repeat */}
              <div>
                <label className="d-block text-left">تکرار رمز عبور</label>
                <input
                  type="password"
                  name="passwordRepeat"
                  className="form-control-auth"
                />
              </div>
              <button type="submit" className="submit-auth">
                ورود
              </button>
            </form>
            <div className="text-left py-4">
              <Link to="/login">
                <i className="fa fa-sign-in mr-1"></i> ورود به سایت
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
