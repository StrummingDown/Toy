import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();
export const loginStatus = atom({
  key: "loginStatus",
  default: false,
});
export const userInfo = atom({
  key: "userInfo",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

// 타입스크립트였다면 ..

// export interface IUser {
//     email: string;
//     password: string;
//   }
