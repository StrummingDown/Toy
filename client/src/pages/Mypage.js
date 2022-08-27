import axios from "axios";
import React, { useEffect, useState } from "react";
import { MypageInfo } from "../components/MypageInfo";
import { Container, MypageContainer } from "../css/Mypage";

export const Mypage = () => {
  const myInfo = async () => {
    const token = window.localStorage.getItem("token");
    const { data } = await axios.post(`http://localhost:4000/users/mypage`, { token });

    // console.log(data);
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
