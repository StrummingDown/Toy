import React from "react";
import { ResultIdContent } from "../css/ResultId";

export const ResultId = ({ userId }) => {
  return (
    <div>
      <ResultIdContent>회원님의 ID는 {userId}입니다.</ResultIdContent>
    </div>
  );
};
