import React from "react";
import { ResultIdContent } from "../css/ResultId";

export const ResultPw = ({ userPw }) => {
  return <ResultIdContent>회원님의 임시 비밀번호는 {userPw}입니다.</ResultIdContent>;
};
