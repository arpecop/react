import { atom } from 'recoil';

export const loggedInUserData = atom({
  key: 'loggedInUser',
  default: {
    name: null,
    id: null,
    accessToken: null,
  },
});
export const loggedInUserData1 = atom({
  key: 'loggedInUser1',
  default: {
    name: null,
    id: null,
    accessToken: null,
  },
});
