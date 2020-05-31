import React from 'react';
import NewPasswordDialog from './../Home/Dialog/NewPasswordDialog';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ContactUsDialog from './../Home/Dialog/ContactUsDialog';

const Header = () => {
  return (
    <div>
      <Helmet>
        <title>پسبوک | صفحه اصلی</title>
      </Helmet>
      <div className="text-center">
        <div className="container">
          <div className="row">
            <div className="col-3 header-box">
              <NewPasswordDialog />
            </div>

            <div className="col-3 header-box border-right">
              <ContactUsDialog />
            </div>

            <Link
              to="/app"
              className="col-3 header-box border-right"
            >
              <div>
                <i className="fa fa-mobile"></i>
              </div>
              <div>اپلیکیشن</div>
            </Link>

            <Link to="/logout" className="col-3 header-box border-right">
              <div>
                <i className="fa fa-sign-out"></i>
              </div>
              <div>خروج</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
