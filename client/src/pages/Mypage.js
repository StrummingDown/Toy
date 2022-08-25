import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { MypageInfo } from "../components/MypageInfo";
import { Container, MypageContainer } from "../css/Mypage";

export const Mypage = () => {
  //   console.log(useRecoilValue(ex));

  const myInfo = async () => {
    const userId = window.localStorage.getItem("userId");
    const { data } = await axios.post(`http://localhost:4000/users/mypage/`, { userId });
    return data;
  };
  const userData = myInfo();

  return (
    <Container>
      <MypageContainer>왼쪽</MypageContainer>
      <MypageInfo data={userData} />
      <MypageContainer>오른쪽</MypageContainer>
    </Container>
  );
};
