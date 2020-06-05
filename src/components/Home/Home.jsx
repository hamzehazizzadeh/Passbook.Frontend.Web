import React, { useState, useEffect } from 'react';
import Footer from '../Footer/Footer';
import Header from './../Header/Header';
import EditPasswordDialog from './Dialog/EdiPasswordDialog';
import ShowPasswordDialog from './Dialog/ShowPasswordDialog';
import DeletePasswordDialog from './Dialog/DeletePasswordDialog';
import { getPasswords } from '../../services/passwordService';

const Home = () => {
  const [allPasswords, setAllPasswords] = useState([]);

  useEffect(() => {
    getPasswords().then((res) => {
      setAllPasswords(res.data);
    });
  });

  let count = 1;
  return (
    <div className="rtl bg-home">
      <Header />
      <div className="container" style={{ minHeight: '78vh' }}>
        {allPasswords.length === 0 ? (
          <div className="text-center text-white my-3">
            هیچ آیتمی برای نمایش وجود ندارد
          </div>
        ) : (
          <table className="table table-striped text-light mt-3">
            <thead>
              <tr className="thead-light">
                <th scope="col">#</th>
                <th scope="col">رمز عبور</th>
                <th scope="col">تاریخ ایجاد</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {allPasswords.map((password) => (
                <tr key={password.id}>
                  <th>{count++}</th>
                  <td>{password.password}</td>
                  <td>{password.createdPersianDateTime}</td>
                  <td>
                    <div className="row">
                      <ShowPasswordDialog password={password} />

                      <EditPasswordDialog passwords={password} />

                      <DeletePasswordDialog passwordId={password.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
