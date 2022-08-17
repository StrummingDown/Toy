import React from "react";
import { HeaderContainer, HeaderIcon, HeaderLoginLink } from "../css/Header";
import icon from "../imgs/restaurant.png";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <HeaderContainer>
      <Link to="/">
        <HeaderIcon src={icon} />
      </Link>
      <HeaderLoginLink to="/login">Login</HeaderLoginLink>
    </HeaderContainer>
  );
};
