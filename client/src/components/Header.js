import React, { useEffect, useState } from "react";
import { HeaderContainer, HeaderIcon, HeaderLoginLink, HeaderWarp, HeaderLogout } from "../css/Header";
import icon from "../imgs/restaurant.png";
import { Link, useNavigate } from "react-router-dom";
import { loginStatus } from "../store";
import { useRecoilState, useRecoilValue } from "recoil";

export const Header = () => {
  const [isLogin, setIsLogin] = useRecoilState(loginStatus);
  const [state, setState] = useState(false);

  const nav = useNavigate();
  const loginState = () => {
    if (loginStatus) {
      setIsLogin(true);
      setState(true);
    } else {
      setIsLogin(false);
      setState(false);
    }
  };

  // useEffect(() => {
  //   loginState();
  // }, [isLogin]);

  const logout = () => {
    setIsLogin(false);
    setState(false);
    nav("/");
  };
  return (
    <HeaderContainer>
      <Link to="/">
        <HeaderIcon src={icon} />
      </Link>

      {isLogin ? (
        <HeaderWarp>
          <HeaderLoginLink to="/">Main</HeaderLoginLink>
          <HeaderLoginLink to="/mypage">Mypage</HeaderLoginLink>
          <HeaderLogout onClick={logout}>Logout</HeaderLogout>
        </HeaderWarp>
      ) : (
        <HeaderWarp>
          <HeaderLoginLink to="/">Main</HeaderLoginLink>
          <HeaderLoginLink to="/login">Login</HeaderLoginLink>
        </HeaderWarp>
      )}
    </HeaderContainer>
  );
};
