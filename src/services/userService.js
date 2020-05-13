import http from './httpService';
import config from './config.json';

export const registerUser = (user) => {
  return http.post(
    `${config.passbookapi}/api/account/register`,
    JSON.stringify(user)
  );
};

export const loginUser = (user) => {
  return http.post(
    `${config.passbookapi}/api/account/login`,
    JSON.stringify(user)
  );
};
