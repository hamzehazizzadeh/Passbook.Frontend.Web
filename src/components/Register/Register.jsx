import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { context } from '../context/context';

const Register = () => {
  const registerContext = useContext(context);
  console.log(registerContext)
  console.log(context)

  const {
    userName,
    setUserName,
    emailAddress,
    setEmailAddress,
    password,
    setPassword,
    repeatPassword,
    setRepeatPassword,
    handleRegister,
    validator,
  } = registerContext;

  return (
    <div className="rtl bg-auth">
      <Helmet>
        <title>پسبوک | ساخت حساب کاربری جدید</title>
      </Helmet>
      <div className="container py-4">
        <div className="content-auth">
          <p className="title-auth">ساخت حساب کاربری جدید</p>
          <div className="container">
            <form
              onSubmit={(e) => {
                handleRegister(e);
              }}
            >
              {/* User Name */}
              <div>
                <label className="d-block text-left">نام کاربری</label>
                <input
                  type="text"
                  name="userName"
                  className="form-control-auth"
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
              {/* Email */}
              <div>
                <label className="d-block text-left">ایمیل</label>
                <input
                  type="email"
                  name="emailAddress"
                  className="form-control-auth"
                  onChange={(e) => {
                    setEmailAddress(e.target.value);
                    validator.current.showMessageFor('emailAddress');
                  }}
                />
                {validator.current.message(
                  'emailAddress',
                  emailAddress,
                  'required'
                )}
              </div>
              {/* Password */}
              <div>
                <label className="d-block text-left">رمز عبور</label>
                <input
                  type="password"
                  name="password"
                  className="form-control-auth"
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
              {/* Password Repeat */}
              <div>
                <label className="d-block text-left">تکرار رمز عبور</label>
                <input
                  type="password"
                  name="repeatPassword"
                  className="form-control-auth"
                  onChange={(e) => {
                    setRepeatPassword(e.target.value);
                    validator.current.showMessageFor('repeatPassword');
                  }}
                />
                {validator.current.message(
                  'repeatPassword',
                  repeatPassword,
                  'required|min:6|max:50'
                )}
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
