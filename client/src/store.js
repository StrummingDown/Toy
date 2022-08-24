import { atom } from "recoil";

export const loginStatus = atom({
  key: "loginStatus",
  default: false,
});
export const userInfo = atom({
  key: "userInfo",
  default: {},
});

// 타입스크립트였다면 ..

// export interface IUser {
//     email: string;
//     password: string;
//   }
