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

export const logoutUser = (userId) => {
  return http.post(
    `${config.passbookapi}/api/account/logout`,
    JSON.stringify(userId)
  );
};

export const forgetPasswordUser = (user) => {
  return http.post(
    `${config.passbookapi}/api/account/forget`,
    JSON.stringify(user)
  );
};

export const resetPasswordUser = (user) => {
  return http.post(
    `${config.passbookapi}/api/account/forget`,
    JSON.stringify(user)
  );
};

export const contactUsMessage = (message) => {
  return http.post(
    `${config.passbookapi}/api/addmessage`,
    JSON.stringify(message)
  );
};
