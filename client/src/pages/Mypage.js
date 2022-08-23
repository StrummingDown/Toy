import axios from "axios";
import React from "react";
import { Container, MypageContainer, MypageTitle, MypageContent, MypageBtn, MypageBtnWrap } from "../css/Mypage";

export const Mypage = () => {
  const Withdrawal = async () => {
    const email = window.localStorage.getItem("email");
    await axios.delete(`http://localhost:4000/users`, { data: { email } });
  };
  const myInfo = async () => {
    const email = window.localStorage.getItem("email");

    await axios.post(`http://localhost:4000/users/mypage`, { email });
  };
  myInfo();
  return (
    <Container>
      <MypageContainer>왼쪽</MypageContainer>
      <MypageContainer>
        <MypageTitle>마이페이지</MypageTitle>
        <MypageContent>ID : 윤대규</MypageContent>
        <MypageContent>Nickname : 응애</MypageContent>
        <MypageContent>E-mail : mylove0330@nate.com</MypageContent>
        <MypageContent>Location : 서울</MypageContent>
        <MypageBtnWrap>
          <MypageBtn>수정하기</MypageBtn>
          <MypageBtn onClick={Withdrawal}>탈퇴하기</MypageBtn>
        </MypageBtnWrap>
      </MypageContainer>
      <MypageContainer>오른쪽</MypageContainer>
    </Container>
  );
};
