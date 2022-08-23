import React, { useEffect, useState } from "react";
import { HeaderContainer, HeaderIcon, HeaderLoginLink, HeaderWarp, HeaderLogout } from "../css/Header";
import icon from "../imgs/restaurant.png";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const email = window.localStorage.getItem("email");
  const loginState = () => {
    if (email) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };
  console.log(isLogin);

  useEffect(() => {
    console.log("이펙트");
    loginState();
  }, [isLogin]);
  const logout = () => {
    window.localStorage.removeItem("email");
    setIsLogin(false);
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
