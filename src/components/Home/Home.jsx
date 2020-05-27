import React, { useState, useEffect } from 'react';
import Footer from '../Footer/Footer';
import Header from './../Header/Header';
import EditPasswordDialog from './Dialog/EditCourseDialog';
import { getPasswords } from '../../services/passwordService';

const Home = () => {
  const [openEditPasswordDialog, setOpenEditPasswordDialog] = useState(false);
  const [allPasswords,] = useState(getPasswords());

  let count = 1;
  return (
    <div className="rtl bg-home">
      <Header />
      <div className="container">
        <table className="table table-striped text-light mt-3">
          <thead>
            <tr className="thead-dark">
              <th scope="col">#</th>
              <th scope="col">رمز عبور</th>
              <th scope="col">تعداد استفاده</th>
              <th scope="col">تاریخ ایجاد</th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {allPasswords.map((password) => (
              <tr key={password.id}>
                <th>{count++}</th>
                <td>{password.password}</td>
                <td>{password.usedIn.length}</td>
                <td>{password.createDateTime}</td>
                <td>
                  <button className="btn btn-info">
                    <i className="fa fa-eye"></i>
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      setOpenEditPasswordDialog(!openEditPasswordDialog)
                    }
                  >
                    <i className="fa fa-pencil"></i>
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger">
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditPasswordDialog password={allPasswords} showDialog={openEditPasswordDialog} />
      <Footer />
    </div>
  );
};

export default Home;
