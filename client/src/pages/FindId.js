import React from "react";
import { Container, FindIdBtn, FindIdContainer, FindIdInput, FindIdText, Title } from "../css/FindId";
import axios from "axios";

export const FindId = () => {
  const sendCertifyNumber = async () => {
    // alert("인증번호를 전송했습니다.");
    const certifyNumber = await axios.get("http://localhost:4000/users/certify");
    console.log(certifyNumber);
    return;
  };
  return (
    <Container>
      <FindIdContainer>왼쪽</FindIdContainer>
      <FindIdContainer>
        <Title>아이디 찾기</Title>
        <FindIdText>E-mail</FindIdText>
        <FindIdInput placeholder="Please Enter your E-mail" />
        <FindIdBtn onClick={sendCertifyNumber}>인증번호 전송</FindIdBtn>
        <FindIdText>인증번호</FindIdText>
        <FindIdInput placeholder="Please Enter Number" /> <FindIdBtn>아이디 찾기</FindIdBtn>
      </FindIdContainer>
      <FindIdContainer>오른쪽</FindIdContainer>
    </Container>
  );
};
