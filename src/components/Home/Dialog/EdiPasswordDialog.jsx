import React, { useState, useRef, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import SimpleReactValidator from 'simple-react-validator';
import { updatePassword } from './../../../services/passwordService';
import { successMessage, errorMessage } from '../../../utils/message';
import { useStyles } from './styleDialog';

const EditPasswordDialog = ({ passwords }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [passwordId, setPasswordId] = useState();
  const [userName, setUserName] = useState();
  const [emailAddress, setEmailAddress] = useState();
  const [usedIn, setUsedIn] = useState();
  const [password, setPassword] = useState();
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setPasswordId(passwords.id);
    setUserName(passwords.userName);
    setEmailAddress(passwords.emailAddress);
    setUsedIn(passwords.usedIn);
    setPassword(passwords.password);

    return () => {
      setPasswordId();
      setUserName();
    };
  },[]);

  const handleEditPassword = async (event, id) => {
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
        const { status, data } = await updatePassword(id, pass);
        if (status === 200) {
          successMessage(data.message);
          setLoading(false);
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

  return (
    <div>
      <button className="btn btn-primary ml-2 mb-2" onClick={handleOpen}>
        <i className="fa fa-pencil"></i>
      </button>
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
          <div className={classes.paper} key={passwordId}>
            <div className="container">
              <h5 className="text-center mt-2 text-success">ویرایش رمز</h5>
              <form
                onSubmit={(e) => {
                  handleEditPassword(e, passwordId);
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
                {/* UsedI n*/}
                <div>
                  <label className="d-block mt-3">جاهای استفاده شده</label>
                  <input
                    type="text"
                    name="usedIn"
                    className="form-control mb-2"
                    value={usedIn}
                    onChange={(e) => {
                      setUsedIn(e.target.value);
                      validator.current.showMessageFor('usedIn');
                    }}
                  />
                  {validator.current.message(
                    'usedIn',
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
                <button
                  type="submit"
                  className="btn btn-success btn-block my-2"
                >
                  ویرایش
                </button>
                <button
                  className="btn btn-danger btn-block"
                  onClick={handleClose}
                >
                  انصراف
                </button>
              </form>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default EditPasswordDialog;
