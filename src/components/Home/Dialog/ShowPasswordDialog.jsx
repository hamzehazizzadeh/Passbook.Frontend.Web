import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useStyles } from './styleDialog';

const ShowPasswordDialog = ({ password }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button className="btn btn-info ml-2 mb-2" onClick={handleOpen}>
        <i className="fa fa-eye"></i>
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
          <div className={classes.paper} key={password.id}>
          <h5 className="text-center mt-2 mb-4 text-success">جزئیات</h5>
          {password.userName ===  null ? null : (
              <div>
                <h6 className="text-success">نام کاربری</h6>
                <p>{password.userName}</p>
              </div>
            )}
            
            {password.emailAddress ===  null ? null : (
              <div>
                <h6 className="text-success">ایمیل</h6>
                <p>{password.emailAddress}</p>
              </div>
            )}
            <div>
              <h6 className="text-success">ورودی های ثبت شده</h6>
              <p>{password.usedIn}</p>
            </div>
            <div>
              <h6 className="text-success">رمزعبور</h6>
              <p>{password.password}</p>
            </div>
            <button
              className="btn btn-success btn-block"
              onClick={handleClose}
            >
              بستن
            </button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ShowPasswordDialog;
