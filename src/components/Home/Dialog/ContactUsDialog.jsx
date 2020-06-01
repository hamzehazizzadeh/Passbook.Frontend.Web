import React, { useState, useEffect, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { decodeToken } from '../../../utils/decodeToken';
import { contactUsMessage } from '../../../services/userService';
import { successMessage, errorMessage } from '../../../utils/message';
import { useStyles } from './styleDialog';

const ContactUsDialog = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [title, setTitle] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = decodeToken(token);
      setUserName(decodedToken.payload.unique_name);
    }
  }, []);

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
    setTitle('');
    setUserMessage('');
  };

  const handleMessage = async (event) => {
    event.preventDefault();
    const message = {
      title,
      userMessage,
    };

    try {
      if (validator.current.allValid()) {
        setLoading(true);
        const { status, data } = await contactUsMessage(message);
        if (status === 200) {
          successMessage(data.message);
          resetStates();
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
          <i className="fa fa-phone"></i>
        </div>
        <div>تماس با ما</div>
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
            <h5 className="text-center mt-2 text-success">تماس با ما</h5>
            <form
              onSubmit={(e) => {
                handleMessage(e);
              }}
            >
              {/* User Name */}
              <div>
                <label className="d-block mt-3">نام کاربری</label>
                <input
                  value={userName}
                  type="text"
                  name="userName"
                  className="form-control mb-2 bg-light"
                  readOnly
                />
              </div>
              {/* Title */}
              <div>
                <label className="d-block mt-3">عنوان</label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  className="form-control mb-2"
                  onChange={(e) => {
                    setTitle(e.target.value);
                    validator.current.showMessageFor('title');
                  }}
                />
                {validator.current.message(
                  'title',
                  title,
                  'required|min:3|max:50'
                )}
              </div>
              {/* User Message */}
              <div>
                <label className="d-block mt-3">پیغام</label>
                <textarea
                  name="userMessage"
                  className="form-control mb-2 text-right"
                  style={{ minHeight: '8rem', maxHeight: '15rem' }}
                  value={userMessage}
                  onChange={(e) => {
                    setUserMessage(e.target.value);
                    validator.current.showMessageFor('userMessage');
                  }}
                ></textarea>
                {validator.current.message(
                  'userMessage',
                  userMessage,
                  'required|min:6|max:50'
                )}
              </div>
              <button type="submit" className="btn btn-success btn-block my-2">
                ارسال
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

export default ContactUsDialog;
