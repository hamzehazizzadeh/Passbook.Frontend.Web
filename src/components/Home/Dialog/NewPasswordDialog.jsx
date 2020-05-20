import React, { useContext } from 'react';
import { Dialog, DialogOverlay, DialogContent } from '@reach/dialog';
import { homeContext } from './../../context/home';

const NewPasswordDialog = ({ showDialog, closeDialog }) => {
  const newPasswordContext = useContext(homeContext);
  let {
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
  } = newPasswordContext;
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
                className="form-control"
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
                className="form-control"
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
                className="form-control"
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
                  className="form-control"
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
              ورود
            </button>
          </form>
        </div>
      </DialogContent>
    </DialogOverlay>
  );
};

export default NewPasswordDialog;
