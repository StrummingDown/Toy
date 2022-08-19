import React from "react";
import { Title } from "../css/Login";
import { Container, PasswordCheckBtn, SignupBtn, SignupContainer, SignupInput, SignupText } from "../css/Signup";

export const Signup = () => {
  return (
    <Container>
      <SignupContainer>왼쪽</SignupContainer>
      <SignupContainer>
        <Title>회원가입</Title>
        <SignupText>
          ID <SignupInput placeholder="Please Enter your ID" />
        </SignupText>
        <SignupText>
          Password <SignupInput placeholder="Please Enter your Password" />
        </SignupText>
        <SignupText>
          Check Password <SignupInput placeholder="Please Check your Password" />
        </SignupText>
        <SignupText>
          Nickname <SignupInput placeholder="Please Enter your Nickname" />
        </SignupText>
        <SignupText>
          <div>lcoation</div>
        </SignupText>
        <SignupBtn>가입하기</SignupBtn>
      </SignupContainer>
      <SignupContainer>오른쪽</SignupContainer>
    </Container>
  );
};
