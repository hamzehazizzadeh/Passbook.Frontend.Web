import React, { useState, useRef } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import SimpleReactValidator from 'simple-react-validator';
import { addPassword } from '../../../services/passwordService';
import { successMessage, errorMessage } from '../../../utils/message';
import { useStyles } from './styleDialog';

const NewPasswordDialog = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [usedIn, setUsedIn] = useState('');
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
    setUsedIn('');
  };

  const handleNewPassword = async (event) => {
    event.preventDefault();
    const pass = {
      userName,
      emailAddress,
      usedIn,
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
          handleClose();
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div onClick={handleOpen}>
        <div>
          <i className="fa fa-plus"></i>
        </div>
        <div>افزودن رمز جدید</div>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h5 className="text-center mt-2 text-success">افزودن رمز جدید</h5>
            <form
              onSubmit={(e) => {
                handleNewPassword(e);
              }}
            >
              {/* User Name */}
              <div>
                <label className="d-block mt-3">نام کاربری</label>
                <input
                  type="text"
                  name="userName"
                  className="form-control mb-2"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                    validator.current.showMessageFor('userName');
                  }}
                />
                {validator.current.message('userName', userName, 'max:20')}
              </div>
              {/* Email */}
              <div>
                <label className="d-block mt-3">ایمیل</label>
                <input
                  type="text"
                  name="emailAddress"
                  className="form-control mb-2"
                  value={emailAddress}
                  onChange={(e) => {
                    setEmailAddress(e.target.value);
                    validator.current.showMessageFor('emailAddress');
                  }}
                />
                {validator.current.message(
                  'emailAddress',
                  emailAddress,
                  'email'
                )}
              </div>
              {/* Used In */}
              <div>
                <label className="d-block mt-3">جاهای استفاده شده</label>
                <input
                  type="text"
                  name="usedIn"
                  className="form-control mb-2"
                  value={usedIn}
                  onChange={(e) => {
                    setUsedIn(e.target.value);
                    validator.current.showMessageFor('placesUsed');
                  }}
                />
                {validator.current.message(
                  'placesUsed',
                  usedIn,
                  'required|max:1000'
                )}
                {/* Password */}
                <div>
                  <label className="d-block mt-3">رمز عبور</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control mb-2"
                    value={password}
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
              <button type="submit" className="btn btn-success btn-block my-2">
                افزودن
              </button>
              <button
                className="btn btn-danger btn-block"
                onClick={handleClose}
              >
                انصراف
              </button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default NewPasswordDialog;
