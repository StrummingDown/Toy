import { atom } from "recoil";

export const user = atom({
  key: "user",
  default: false,
});

// 타입스크립트였다면 ..

// export interface IUser {
//     email: string;
//     password: string;
//   }
