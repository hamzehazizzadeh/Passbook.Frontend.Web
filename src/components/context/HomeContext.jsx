import React, { useRef, useState } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { homeContext } from './home';
import { successMessage, errorMessage } from './../../utils/message';
import { addPassword } from './../../services/passwordService';

const HomeContext = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [placesUsed, setPlacesUsed] = useState('');
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
    setPlacesUsed('');
  };

  const handleNewPassword = async (event) => {
    event.preventDefault();
    const pass = {
      userName,
      emailAddress,
      placesUsed,
      password,
    };
    try {
      if (validator.current.allValid()) {
        setLoading(true);
        const { status, data } = await addPassword(pass);
        if (status === 200) {
          successMessage(data.message);
          setLoading(false);
          resetStates();
          window.location.reload(true)
        } else if (status === 400) {
          errorMessage(data.errorMessage);
          setLoading(false);
        }
      } else {
        validator.current.showMessages();
        setLoading(false);
      }
    } catch (ex) {
      errorMessage('مشکلی در ثبت نام پیش آمده.');
      setLoading(false);
    }
  };

  return (
    <homeContext.Provider
      value={{
        userName,
        setUserName,
        emailAddress,
        setEmailAddress,
        password,
        setPassword,
        placesUsed,
        setPlacesUsed,
        validator,
        loading,
        handleNewPassword,
      }}
    >
      {children}
    </homeContext.Provider>
  );
};

export default HomeContext;
