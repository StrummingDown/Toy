import React from "react";
import { HeaderContainer, HeaderIcon, HeaderLoginLink, HeaderWarp } from "../css/Header";
import icon from "../imgs/restaurant.png";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <HeaderContainer>
      <Link to="/">
        <HeaderIcon src={icon} />
      </Link>
      <HeaderWarp>
        <HeaderLoginLink to="/">Main</HeaderLoginLink>
        <HeaderLoginLink to="/login">Login</HeaderLoginLink>
      </HeaderWarp>
    </HeaderContainer>
  );
};
