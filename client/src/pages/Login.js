import {
  Container,
  LoginContainer,
  LoginText,
  LoginInput,
  LoginBtn,
  LoginBtnDiv,
  Title,
  SubBtn,
  FinderText,
  SubLink,
} from "../css/Login";
import { useState, React } from "react";

export const Login = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const onChangeId = (event) => {
    setId(event.target.value);
  };
  const onChangePw = (event) => {
    setPw(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    window.localStorage.setItem("id", id);
    window.localStorage.setItem("pw", pw);
  };

  return (
    <div>
      <Container>
        <div>왼쪽</div>
        <LoginContainer onSubmit={onSubmit}>
          <Title>Login</Title>
          <LoginText>
            ID <LoginInput onChange={onChangeId} placeholder="Please enter your ID" />
          </LoginText>
          <LoginText>
            Password <LoginInput onChange={onChangePw} placeholder="Please enter your Password" />
          </LoginText>
          <LoginBtnDiv>
            <LoginBtn>로그인</LoginBtn>
          </LoginBtnDiv>
          <FinderText>
            <SubLink to="/findId"> 아이디 찾기 |</SubLink>
            <SubBtn> 비밀번호 찾기 </SubBtn>
            &nbsp;|
            <SubLink to="/signup"> 회원가입</SubLink>
          </FinderText>
        </LoginContainer>
        <div>오른쪽</div>
      </Container>
    </div>
  );
};
