import React, { useState, useRef } from 'react';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import { successMessage, errorMessage } from '../../../utils/message';
import { addPassword } from '../../../services/passwordService';
import SimpleReactValidator from 'simple-react-validator';

const NewPasswordDialog = ({ showDialog, closeDialog }) => {
  const [userName, setUserName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [placesUsed, setPlacesUsed] = useState('');
  const [, setLoading] = useState(false);

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
          window.location.reload(true);
        } else if (status === 400) {
          errorMessage(data.errorMessage);
          setLoading(false);
        }
      } else {
        validator.current.showMessages();
        setLoading(false);
      }
    } catch (ex) {
      errorMessage('مشکلی در افزودن پیش آمده.');
      setLoading(false);
    }
  };
  return (
    <DialogOverlay
      style={{ position: 'fixed', top: '0' }}
      isOpen={showDialog}
      onDismiss={closeDialog}
      className="rtl bg-white"
    >
      <DialogContent
        style={{
          border: 'solid 2px hsla(0, 0%, 0%, 0.5)',
          borderRadius: '5px',
          boxShadow: '0px 10px 50px hsla(0, 0%, 0%, 0.33)',
        }}
      >
        <div className="container">
          <h5 className="text-center mt-2 text-success">افزودن رمز جدید</h5>
          <form
            onSubmit={(e) => {
              handleNewPassword(e);
            }}
          >
            {/* User Name */}
            <div>
              <label className="d-block text-left mt-3">نام کاربری</label>
              <input
                type="text"
                name="userName"
                className="form-control mb-2"
                onChange={(e) => {
                  setUserName(e.target.value);
                  validator.current.showMessageFor('userName');
                }}
              />
              {validator.current.message('userName', userName, 'max:250')}
            </div>
            {/* Email */}
            <div>
              <label className="d-block text-left mt-3">ایمیل</label>
              <input
                type="text"
                name="emailAddress"
                className="form-control mb-2"
                onChange={(e) => {
                  setEmailAddress(e.target.value);
                  validator.current.showMessageFor('emailAddress');
                }}
              />
              {validator.current.message('emailAddress', emailAddress, 'email')}
            </div>
            {/* Places Used */}
            <div>
              <label className="d-block text-left mt-3">
                جاهای استفاده شده
              </label>
              <input
                type="text"
                name="placesUsed"
                className="form-control mb-2"
                onChange={(e) => {
                  setPlacesUsed(e.target.value);
                  validator.current.showMessageFor('placesUsed');
                }}
              />
              {validator.current.message('placesUsed', placesUsed, 'max:1000')}
              {/* Password */}
              <div>
                <label className="d-block text-left mt-3">رمز عبور</label>
                <input
                  type="password"
                  name="password"
                  className="form-control mb-2"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validator.current.showMessageFor('password');
                  }}
                />
                {validator.current.message(
                  'password',
                  password,
                  'required|min:3|max:250'
                )}
              </div>
            </div>
            <button type="submit" className="btn btn-success btn-block my-3">
              افزودن
            </button>
          </form>
        </div>
      </DialogContent>
    </DialogOverlay>
  );
};

export default NewPasswordDialog;
