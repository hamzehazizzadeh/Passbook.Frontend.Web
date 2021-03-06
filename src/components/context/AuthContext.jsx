import React, { useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { withRouter } from 'react-router';
import { context } from './auth';
import { errorMessage, successMessage } from '../../utils/message';
import {
  registerUser,
  loginUser,
  forgetPasswordUser,
  resetPasswordUser,
} from '../../services/userService';

const AuthContext = ({ children, history }) => {
  const [userName, setUserName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validator = useRef(
    new SimpleReactValidator({
      messages: {
        required: 'پر کردن این فیلد الزامی میباشد',
        email: 'ایمیل وارد شده صحیح نمی باشد',
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
    if (password === repeatPassword) {
      const user = {
        userName,
        emailAddress,
        password,
      };
      try {
        if (validator.current.allValid()) {
          setLoading(true);
          const { status, data } = await registerUser(user);
          if (status === 200) {
            successMessage(data.errorMessage);
            history.push('/');
            setLoading(false);
          }
        } else {
          validator.current.showMessages();
          setLoading(false);
        }
      } catch ({ response }) {
        if (response) {
          if (response.status !== null) {
            errorMessage(response.data.errorMessage);
          } else {
            errorMessage('مشکلی پیش آمده است لطفا دوباره امتحان کنید');
          }
        } else {
          errorMessage('لطفا از اتصال خود به اینترنت مطمئن شوید');
        }
        setLoading(false);
      }
    } else {
      errorMessage('تکرار رمز عبور صحیح نمی باشد.');
      setLoading(false);
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
        setLoading(true);
        const { status, data } = await loginUser(user);
        if (status === 200) {
          successMessage(data.message);
          localStorage.setItem('token', data.token);
          history.replace('/home');
          resetStates();
          setLoading(false);
          window.location.reload();
        }
      } else {
        validator.current.showMessages();
        setLoading(false);
      }
    } catch ({ response }) {
      if (response) {
        if (response.status !== null) {
          errorMessage(response.data.errorMessage);
        } else {
          errorMessage('مشکلی پیش آمده است لطفا دوباره امتحان کنید');
        }
      } else {
        errorMessage('لطفا از اتصال خود به اینترنت مطمئن شوید');
      }
      setLoading(false);
    }
  };

  const handleForgetPassword = async (event) => {
    event.preventDefault();
    const user = {
      emailAddress,
    };

    try {
      if (validator.current.allValid()) {
        setLoading(true);
        const { status, data } = await forgetPasswordUser(user);
        if (status === 200) {
          successMessage(data.message);
          history.replace('/');
          resetStates();
          setLoading(false);
        }
      } else {
        validator.current.showMessages();
        setLoading(false);
      }
    } catch ({ response }) {
      if (response) {
        if (response.status !== null) {
          errorMessage(response.data.errorMessage);
        } else {
          errorMessage('مشکلی پیش آمده است لطفا دوباره امتحان کنید');
        }
      } else {
        errorMessage('لطفا از اتصال خود به اینترنت مطمئن شوید');
      }
      setLoading(false);
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    if (password === repeatPassword) {
      const user = {
        password,
      };
      try {
        if (validator.current.allValid()) {
          setLoading(true);
          const { status, data } = await resetPasswordUser(user);
          if (status === 200) {
            successMessage(data.message);
            history.replace('/');
            resetStates();
            setLoading(false);
          }
        } else {
          validator.current.showMessages();
          setLoading(false);
        }
      } catch ({ response }) {
        if (response) {
          if (response.status !== null) {
            errorMessage(response.data.errorMessage);
          } else {
            errorMessage('مشکلی پیش آمده است لطفا دوباره امتحان کنید');
          }
        } else {
          errorMessage('لطفا از اتصال خود به اینترنت مطمئن شوید');
        }
        setLoading(false);
      }
    } else {
      errorMessage('تکرار رمز عبور صحیح نمی باشد.');
      setLoading(false);
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
        loading,
        handleRegister,
        handleLogin,
        handleForgetPassword,
        handleResetPassword,
      }}
    >
      {children}
    </context.Provider>
  );
};

export default withRouter(AuthContext);
