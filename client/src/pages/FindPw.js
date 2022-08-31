import React from "react";
import { Container, FindIdBtn, FindIdContainer, FindIdInput, FindIdText, Title } from "../css/FindId";

export const FindPw = () => {
  return (
    <Container>
      <FindIdContainer>왼쪽</FindIdContainer>
      <FindIdContainer>
        <Title>비밀번호 찾기</Title>
        <FindIdText>ID</FindIdText>
        <FindIdInput placeholder="Please Enter your ID" />
        <FindIdBtn>아이디 확인</FindIdBtn>
        <FindIdText>E-mail</FindIdText>
        <FindIdInput placeholder="Please Enter your E-mail" />
        <FindIdBtn>인증번호 전송</FindIdBtn>
        <FindIdText>인증번호</FindIdText>
        <FindIdInput placeholder="Please Enter Number" />{" "}
        <FindIdBtn style={{ marginLeft: "-4px" }}>비밀번호 찾기</FindIdBtn>
      </FindIdContainer>
      <FindIdContainer>오른쪽</FindIdContainer>
    </Container>
  );
};
