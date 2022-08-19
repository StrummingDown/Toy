import React from "react";
import { Container, FindIdBtn, FindIdContainer, FindIdInput, FindIdText, Title } from "../css/FindId";

export const FindId = () => {
  return (
    <Container>
      <FindIdContainer>왼쪽</FindIdContainer>
      <FindIdContainer>
        <Title>아이디 찾기</Title>
        <FindIdText>E-mail</FindIdText>
        <FindIdInput placeholder="Please Enter your E-mail" />
        <FindIdBtn>인증번호 전송</FindIdBtn>
        <FindIdText>인증번호</FindIdText>
        <FindIdInput placeholder="Please Enter Number" /> <FindIdBtn>아이디 찾기</FindIdBtn>
      </FindIdContainer>
      <FindIdContainer>오른쪽</FindIdContainer>
    </Container>
  );
};
