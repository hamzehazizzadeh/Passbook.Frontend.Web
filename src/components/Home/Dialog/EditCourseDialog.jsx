import React, { useEffect, useState, useRef } from 'react';
import { Dialog, DialogOverlay, DialogContent } from '@reach/dialog';
import { getPassword } from '../../../services/passwordService';
import SimpleReactValidator from 'simple-react-validator';
import { updatePassword } from './../../../services/passwordService';

const EditPasswordDialog = ({ showDialog, closeDialog }) => {
  const [passwordId, setPasswordId] = useState();
  const [userName, setUserName] = useState();
  const [emailAddress, setEmailAddress] = useState();
  const [placesUsed, setPlacesUsed] = useState();
  const [password, setPassword] = useState();
  const [allPassword] = useState(getPassword());

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

  useEffect(() => {
    setPasswordId(allPassword._id);
    setUserName(allPassword.userName);
    setEmailAddress(allPassword.emailAddress);
    setPlacesUsed(allPassword.placesUsed);
    setPassword(allPassword.password);

    return () => {
      setPasswordId();
      setUserName();
      setEmailAddress();
      setPlacesUsed();
      setPassword();
    };
  }, [allPassword]);

  const handleEditPassword = (event) => {
    event.preventDefault();
    let data = new FormData();
    data.append('userName', userName);
    data.append('emailAddress', emailAddress);
    data.append('placesUsed', placesUsed);
    data.append('password', password);

    updatePassword(passwordId, data);
    closeDialog();
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
          <h5 className="text-center mt-2 text-success">ویرایش رمز</h5>
          <form
            onSubmit={(e) => {
              handleEditPassword(e);
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
              ویرایش
            </button>
          </form>
        </div>
      </DialogContent>
    </DialogOverlay>
  );
};

export default EditPasswordDialog;
