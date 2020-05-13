import { createContext } from 'react';

export const context = createContext({
  userName: '',
  setUserName: () => {},
  emailAddress: '',
  setEmailAddress: () => {},
  password: '',
  setPassword: () => {},
  repeatPassword: '',
  setRepeatPassword: () => {},
  validator: null,
  handleLogin: () => {},
  handleRegister: () => {},
});