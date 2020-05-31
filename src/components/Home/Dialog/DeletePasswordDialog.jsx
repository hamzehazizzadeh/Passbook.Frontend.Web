import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { deletePassword } from '../../../services/passwordService';
import { successMessage } from '../../../utils/message';
import { useStyles } from './styleDialog';

const DeletePasswordDialog = ({ passwordId }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDeletePassword = (passId) => {
    deletePassword(passId).then((res) => {
      if (res.status === 200) {
        successMessage(res.data.message);
        handleClose()
      }
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button className="btn btn-danger ml-2 mb-2" onClick={handleOpen}>
        <i className="fa fa-trash"></i>
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
            <h5 className="text-center mb-4 text-success">آیا از حذف مطمئن هستید؟</h5>

            <button
              className="btn btn-success btn-block"
              onClick={() => handleDeletePassword(passwordId)}
            >
              مطمئنم پاک کن
            </button>
            <button className="btn btn-danger btn-block" onClick={handleClose}>
              انصراف
            </button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default DeletePasswordDialog;
