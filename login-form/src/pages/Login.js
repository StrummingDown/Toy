import { Container, LoginContainer, LoginText, LoginInput, LoginBtn, LoginBtnDiv } from "../css/login";
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
          <h2>Login</h2>
          <LoginText>
            ID <LoginInput onChange={onChangeId} placeholder="Please enter your ID" />
          </LoginText>
          <LoginText>
            Password <LoginInput onChange={onChangePw} placeholder="Please enter your Password" />
          </LoginText>
          <LoginBtnDiv>
            <LoginBtn>로그인</LoginBtn>
          </LoginBtnDiv>
        </LoginContainer>
        <div>오른쪽</div>
      </Container>
    </div>
  );
};
