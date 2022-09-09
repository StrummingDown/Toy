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
import { useState, React, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginStatus, userToken, userInfo } from "../store";
import { debounce } from "lodash";

export const Login = () => {
  const [userId, setuserId] = useState("");
  const [pw, setPw] = useState("");
  const [isLogin, setIsLogin] = useRecoilState(loginStatus);
  const [userData, setUserData] = useRecoilState(userInfo);
  const [token, setToken] = useRecoilState(userToken);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const nav = useNavigate();

  const onChangeId = (event) => {
    setuserId(event.target.value);
  };
  const onChangePw = (event) => {
    setPw(event.target.value);
  };

  const login = async (loginData) => {
    const {
      data: { token, userData },
    } = await axios.post(`http://localhost:4000/users/login`, { userId: loginData, password: pw });

    if (token) {
      setUserData(userData);
      setToken(token);
    }
    return userData;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const data = await login(userId);
    if (!data) {
      alert("회원정보가 일치하지 않습니다.");
    } else {
      setIsLogin(true);
      nav("/");
    }
  };
  const handleResize = debounce(() => {
    setWindowSize({
      width: window.innerWidth + "px",
      height: window.innerHeight + "px",
    });
    console.log(`브라우저 화면 사이즈 x : : ${window.innerWidth}, y: ${window.innerHeight}`);
  }, 1000);

  useEffect(() => {
    window.addEventListener(`resize`, handleResize);
    return () => {
      window.removeEventListener(`resize`, handleResize);
    };
  }, []);

  return (
    <div style={{ height: windowSize.height }}>
      <Container>
        <div>
          사이즈 x:{windowSize.width} y : {windowSize.height}
        </div>
        <LoginContainer onSubmit={onSubmit}>
          <div style={{ height: "80%", width: "100%" }}>
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
              <SubLink to="/find/id"> 아이디 찾기 </SubLink>|<SubLink to="/find/pw"> 비밀번호 찾기 </SubLink>|
              <SubLink to="/signup">회원가입</SubLink>
            </FinderText>
          </div>
        </LoginContainer>
        <div>오른쪽</div>
      </Container>
    </div>
  );
};
