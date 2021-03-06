import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const NotFound = () => {
  return (
    <div className="notfound-content">
      <Helmet>
        <title>پسبوک | صفحه مورد نظر یافت نشد</title>
      </Helmet>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="main">
        <h1 className="notfound-header">404</h1>
        <p className="notfound-paragraph mb-4">
          متاسفانه صفحه مورد نظر یافت نشد
        </p>
        <Link className="notfound-button" to="/">
          بازگشت
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
