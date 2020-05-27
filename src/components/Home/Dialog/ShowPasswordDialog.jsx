import React, { useState } from 'react';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import { getPassword } from '../../../services/passwordService';

const ShowPasswordDialog = ({ showDialog, closeDialog, passwordId }) => {
  const [showPassword, setShowPassword] = useState([]);

  getPassword(passwordId).then((res) => {
    setShowPassword(res.data);
  });

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
        {showPassword.map((password) => (
          <div className="container">
            <div className="mt-2" key={password.id}>
              <h5>نام کاربری</h5>
              <p>{password.userName}</p>
            </div>
            <div>
              <h5>ایمیل</h5>
              <p>{password.email}</p>
            </div>
            <div>
              <h5>جاهای استفاده شده</h5>
              <p>{password.usedIn}</p>
            </div>
            <div>
              <h5>رمزعبور</h5>
              <p>{password.password}</p>
            </div>
          </div>
        ))}
      </DialogContent>
    </DialogOverlay>
  );
};

export default ShowPasswordDialog;
