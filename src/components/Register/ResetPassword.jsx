import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { context } from '../context/context';
import HashLoader from 'react-spinners/HashLoader';

const ResetPassword = () => {
  const registerContext = useContext(context);

  const {
    password,
    setPassword,
    repeatPassword,
    setRepeatPassword,
    handleResetPassword,
    validator,
    loading,
  } = registerContext;
  return (
    <div className="rtl bg-auth">
      <Helmet>
        <title>پسبوک | تغییر رمز عبور</title>
      </Helmet>
      <HashLoader
        css={'width:100%;position: absolute; top : 50%;'}
        size={50}
        color={'#ff0000'}
        loading={loading}
      />

      <div className="container py-4">
        <div className="content-auth">
          <p className="title-auth">تغییر رمز عبور</p>
          <div className="container">
            <form
              onSubmit={(e) => {
                handleResetPassword(e);
              }}
            >
              {/* Email */}
              <div>
                <label className="d-block text-left">ایمیل</label>
                <input
                  type="email"
                  name="emailAddress"
                  className="form-control-auth bg-secondary"
                  readOnly
                />
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
              <div>
                <Link to="/">
                  <i className="fa fa-sign-in mr-2"></i> ورود به سایت
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

export default ResetPassword;
