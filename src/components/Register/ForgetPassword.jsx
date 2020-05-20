import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { context } from '../context/auth';
import HashLoader from 'react-spinners/HashLoader';

const ForgetPassword = () => {
  const loginContext = useContext(context);

  const {
    emailAddress,
    setEmailAddress,
    validator,
    loading,
    handleForgetPassword,
  } = loginContext;

  return (
    <div className="rtl bg-auth">
      <Helmet>
        <title>پسبوک | بازیابی رمز عبور</title>
      </Helmet>
      <HashLoader
        css={'width:100%; position: absolute; top : 50% ;'}
        size={50}
        color={'#ff0000'}
        loading={loading}
      />

      <div className="container py-4">
        <div className="content-auth">
          <p className="title-auth">بازیابی رمز عبور</p>
          <div className="container">
            <form onSubmit={(e) => handleForgetPassword(e)}>
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
                  'required|email'
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

export default ForgetPassword;
