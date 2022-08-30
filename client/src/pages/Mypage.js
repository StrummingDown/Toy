import axios from "axios";
import React, { useEffect, useState } from "react";
import { useResetRecoilState } from "recoil";
import { MypageInfo } from "../components/MypageInfo";
import { Container, MypageContainer } from "../css/Mypage";
import { userInfo } from "../store";

export const Mypage = () => {
  const expriedToken = useResetRecoilState(userInfo);
  const myInfo = async () => {
    const token = window.localStorage.getItem("token");
    const { data } = await axios.post(`http://localhost:4000/users/mypage`, { token });
    if (!data) {
      expriedToken();
      window.alert("토큰이 만료되었습니다. 로그인을 다시 해주세요.");
    }
    console.log("마이페이지 렌더링");
    return data;
  };
  // const getMyInfo = async () => {
  //   const userData = await myInfo();
  //   console.log(userData);
  //   return userData;
  // };
  const userData = myInfo();
  // console.log(ex);

  return (
    <Container>
      <MypageContainer>왼쪽</MypageContainer>
      <MypageInfo data={userData} />
      <MypageContainer>오른쪽</MypageContainer>
    </Container>
  );
};
