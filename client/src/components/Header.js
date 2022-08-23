import React, { useEffect, useState } from "react";
import { HeaderContainer, HeaderIcon, HeaderLoginLink, HeaderWarp, HeaderLogout } from "../css/Header";
import icon from "../imgs/restaurant.png";
import { Link } from "react-router-dom";
import { user } from "../store";
import { useRecoilState } from "recoil";

export const Header = () => {
  const [isLogin, setIsLogin] = useRecoilState(user);
  const [state, setState] = useState(false);
  const loginState = () => {
    if (user) {
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
