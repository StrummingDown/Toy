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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginStatus, userInfo } from "../store";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [isLogin, setIsLogin] = useRecoilState(loginStatus);
  const [userData, setUserData] = useRecoilState(userInfo);

  const nav = useNavigate();

  const onChangeId = (event) => {
    setEmail(event.target.value);
  };
  const onChangePw = (event) => {
    setPw(event.target.value);
  };

  const login = async (loginData) => {
    const { data } = await axios.post(`http://localhost:4000/users/login`, { email: loginData, password: pw });

    if (data) {
      setUserData(data);
      console.log(userData);
      window.localStorage.setItem("email", email);
      window.localStorage.setItem("pw", pw);
    }
    return data;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const userData = await login(email);
    console.log(userData);
    if (!userData) {
      alert("회원정보가 일치하지 않습니다.");
    } else {
      setIsLogin(true);
      nav("/");
    }
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
            Password <LoginInput onChange={onChangePw} type="password" placeholder="Please enter your Password" />
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
