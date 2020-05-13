import React, { useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { withRouter } from 'react-router';
import { context } from './context';
import { errorMessage, successMessage } from '../../utils/message';
import { registerUser, loginUser } from '../../services/userService';

const AuthContext = ({ children, history }) => {
  const [userName, setUserName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const validator = useRef(
    new SimpleReactValidator({
      messages: {
        required: 'پر کردن این فیلد الزامی میباشد',
        email: 'ایمیل نوشته شده صحیح نمی باشد',
        min: 'طول کاراکتر وارد شده کمتر از حد مجاز است',
        max: 'طول کاراکتر وارد شده بیشتر از حد مجاز است',
      },
      element: (message) => <p className="valid-message">{message}</p>,
    })
  );

  const resetStates = () => {
    setUserName('');
    setEmailAddress('');
    setPassword('');
    setRepeatPassword('');
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    if (password == repeatPassword) {
      const user = {
        userName,
        emailAddress,
        password,
      };
      try {
        if (validator.current.allValid()) {
          const { status, data } = await registerUser(user);
          if (status === 200) {
            successMessage('حساب کاربری شما با موفقیت ایجاد شد.');
            history.push('/login');
          } else if (status === 400) {
            errorMessage(data.errorMessage);
          }
        } else {
          validator.current.showMessages();
        }
      } catch (ex) {
        errorMessage('مشکلی در ثبت نام پیش آمده.');
      }
    } else {
      errorMessage('تکرار رمز عبور صحیح نمی باشد.');
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const user = {
      userName,
      password,
    };

    try {
      if (validator.current.allValid()) {
        const { status, data } = await loginUser(user);
        if (status === 200) {
          successMessage('ورود موفقیت آمیز بود.');
          history.replace('/');
          resetStates();
        } else if (status === 400) {
          errorMessage(data.errorMessage);
        }
      } else {
        validator.current.showMessages();
      }
    } catch (ex) {
      errorMessage('مشکلی در ورود پیش آمده.');
    }
  };

  return (
    <context.Provider
      value={{
        userName,
        setUserName,
        emailAddress,
        setEmailAddress,
        password,
        setPassword,
        repeatPassword,
        setRepeatPassword,
        validator,
        handleRegister,
        handleLogin,
      }}
    >
      {children}
    </context.Provider>
  );
};

export default withRouter(AuthContext);
