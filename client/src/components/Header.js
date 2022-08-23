import React from "react";
import { HeaderContainer, HeaderIcon, HeaderLoginLink, HeaderWarp, HeaderBgColor } from "../css/Header";
import icon from "../imgs/restaurant.png";
import { Link } from "react-router-dom";

export const Header = () => {
  const email = window.localStorage.getItem("email");

  return (
    <HeaderContainer>
      <Link to="/">
        <HeaderIcon src={icon} />
      </Link>

      {email ? (
        <HeaderWarp>
          <HeaderLoginLink to="/">Main</HeaderLoginLink>
          <HeaderLoginLink to="/mypage">Mypage</HeaderLoginLink>{" "}
        </HeaderWarp>
      ) : (
        <HeaderWarp>
          <HeaderLoginLink to="/">Main</HeaderLoginLink>
          <HeaderLoginLink to="/login">Login</HeaderLoginLink>{" "}
        </HeaderWarp>
      )}
    </HeaderContainer>
  );
};
