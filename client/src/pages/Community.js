import React from "react";
import { CommunityContainer } from "../css/Community";

export const Community = () => {
  return (
    <CommunityContainer>
      <h1 style={{ textAlign: "center" }}>게시판</h1>
      <div style={{ display: "flex", justifyContent: "space-between", margin: "0px 100px" }}>
        <div>
          <h3 style={{ textAlign: "center" }}>번호</h3>
          12301
        </div>
        <div>
          <h3 style={{ textAlign: "center" }}>제목</h3>핸드폰을 잃어버렸습니다..ㅜ
        </div>
        <div>
          <h3 style={{ textAlign: "center" }}>글쓴이</h3>멍청이
        </div>
        <div>
          <h3 style={{ textAlign: "center" }}>날짜</h3>2022.09.16
        </div>
        <div>
          <h3 style={{ textAlign: "center" }}>조회 수</h3>11232
        </div>
        <div>
          <h3 style={{ textAlign: "center" }}>추천 수</h3>32
        </div>
      </div>
    </CommunityContainer>
  );
};
