import http from './httpService';
import config from './config.json';

export const addPassword = (pass) => {
  return http.post(
    `${config.passbookapi}/api/password/addpassword/`,
    JSON.stringify(pass)
  );
};

export const getPasswords = () => {
  return http.get(`${config.passbookapi}/api/password/getpasswords/`);
};

export const updatePassword = (passId, pass) => {
  return http.put(
    `${config.passbookapi}/api/password/editpassword?id=${passId}`,
    pass
  );
};

export const deletePassword = (passId) => {
  return http.delete(
    `${config.passbookapi}/api/password/deletepassword?id=${passId}`
  );
};
