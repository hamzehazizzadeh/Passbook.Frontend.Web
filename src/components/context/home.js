import { createContext } from 'react';

export const homeContext = createContext({
  userName: '',
  setUserName: () => {},
  emailAddress: '',
  setEmailAddress: () => {},
  password: '',
  setPassword: () => {},
  placesUsed: '',
  setPlacesUsed: () => {},
  validator: null,
  handleNewPassword: () => {},
});
