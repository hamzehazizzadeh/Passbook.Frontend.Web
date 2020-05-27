import React, { useState } from 'react';
import NewPasswordDialog from './../Home/Dialog/NewPasswordDialog';
import { Link } from 'react-router-dom';

const Header = () => {
  const [openNewPasswordDialog, setOpenNewPasswordDialog] = useState(false);
  
  return (
    <div>
      <div className="row text-center">
        <div
          onClick={() => {
            setOpenNewPasswordDialog(!openNewPasswordDialog);
          }}
          className="col-3 header-box"
        >
          <div>
            <i className="fa fa-plus"></i>
          </div>
          <div>افزودن رمز جدید</div>
        </div>

        <Link to="#" className="col-3 header-box border-right">
          <div>
            <i className="fa fa-lock"></i>
          </div>
          <div>رمز تصادفی</div>
        </Link>

        <Link to="/contact-us" className="col-3 header-box border-right">
          <div>
            <i className="fa fa-phone-square"></i>
          </div>
          <div>تماس با ما</div>
        </Link>

        <a
          href="https://github.com/murik-team"
          className="col-3 header-box border-right"
        >
          <div>
            <i className="fa fa-users"></i>
          </div>
          <div>همکاری با پسبوک</div>
        </a>
      </div>
      <NewPasswordDialog
        showDialog={openNewPasswordDialog}
      />
    </div>
  );
};

export default Header;
