import { atom } from 'recoil'

export const loggedInUserData = atom({
   key: 'loggedInUser',
   default: {
      name: null,
      id: null,
      accessToken: null,
   },
})
export const nickname = atom({
   key: 'nickname',
   default: {
      nickname: null,
   },
})
