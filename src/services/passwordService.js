import http from './httpService';
import config from './config.json';

export const addPassword = (pass) => {
  return http.post(
    `${config.passbookapi}/api/`,
    JSON.stringify(pass)
  );
};