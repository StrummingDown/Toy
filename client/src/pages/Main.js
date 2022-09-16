import React from "react";
import { MainContent, MainWrapper } from "../css/Main";
import bear from "../imgs/bear.webp";
export const Main = () => {
  return (
    <MainWrapper>
      <MainContent>
        <h1 style={{ textAlign: "center" }}>안녕하세요 토이 프로젝트 입니다.</h1>
        <div style={{ textAlign: "center" }}>
          <img src={bear} style={{ padding: "5px", textAlign: "center" }} />
        </div>
      </MainContent>
    </MainWrapper>
  );
};
