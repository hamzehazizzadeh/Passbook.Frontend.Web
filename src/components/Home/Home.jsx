import React, { useState } from 'react';
import Footer from '../Footer/Footer';
import Header from './../Header/Header';
import { getPasswords } from '../../services/passwordService';
import EditPasswordDialog from './Dialog/EdiPasswordDialog';
import ShowPasswordDialog from './Dialog/ShowPasswordDialog';

const Home = () => {
  const [openEditPasswordDialog, setOpenEditPasswordDialog] = useState(false);
  const [openShowPasswordDialog, setOpenShowPasswordDialog] = useState(false);
  const [passwordId, setPasswordId] = useState();
  const [allPasswords, setAllPasswords] = useState([]);
  getPasswords().then((res) => {
    setAllPasswords(res.data);
  });

  let count = 1;
  return (
    <div className="rtl bg-home">
      <Header />
      <div className="container" style={{ minHeight: '73vh' }}>
        {allPasswords.length === 0 ? (
          <div className="text-center text-white my-3">
            هیچ آیتمی برای نمایش وجود ندارد
          </div>
        ) : (
          <table className="table table-striped text-light mt-3">
            <thead>
              <tr className="thead-dark">
                <th scope="col">#</th>
                <th scope="col">رمز عبور</th>
                <th scope="col">تعداد استفاده</th>
                <th scope="col">تاریخ ایجاد</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {allPasswords.map((password) => (
                <tr key={password.id}>
                  <th>{count++}</th>
                  <td>{password.password}</td>
                  <td>{password.usedIn}</td>
                  <td>{password.createdDateTime}</td>
                  <td>
                    <button
                      className="btn btn-info ml-2"
                      onClick={() => {
                        setOpenShowPasswordDialog(!openShowPasswordDialog);
                        setPasswordId(password.id)
                      }}
                    >
                      <i className="fa fa-eye"></i>
                    </button>

                    <button
                      className="btn btn-primary ml-2"
                      onClick={() =>
                        setOpenEditPasswordDialog(!openEditPasswordDialog)
                      }
                    >
                      <i className="fa fa-pencil"></i>
                    </button>

                    <button className="btn btn-danger ml-2">
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <EditPasswordDialog
        password={allPasswords}
        showDialog={openEditPasswordDialog}
      />
      <ShowPasswordDialog
        passwordId={passwordId}
        showDialog={openShowPasswordDialog}
      />
      <Footer />
    </div>
  );
};

export default Home;
