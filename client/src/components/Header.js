import React, { useEffect, useState } from "react";
import { HeaderContainer, HeaderIcon, HeaderLoginLink, HeaderWarp, HeaderLogout } from "../css/Header";
import icon from "../imgs/restaurant.png";
import { Link, useNavigate } from "react-router-dom";
import { userInfo, userToken } from "../store";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

export const Header = () => {
  const [state, setState] = useState(false);
  const { email } = useRecoilValue(userInfo);
  const token = useRecoilValue(userToken);
  const deleteToken = useResetRecoilState(userToken);
  const nav = useNavigate();

  const logout = () => {
    setState(false);
    deleteToken();
    nav("/");
  };

  return (
    <HeaderContainer>
      <Link to="/">
        <HeaderIcon src={icon} />
      </Link>

      {token ? (
        <HeaderWarp>
          <HeaderLoginLink to="/">Main</HeaderLoginLink>
          <HeaderLoginLink to={`/location`}> Location </HeaderLoginLink>
          <HeaderLoginLink to={`/community`}> Community </HeaderLoginLink>
          <HeaderLoginLink to={`/mypage/${email}`}> Mypage </HeaderLoginLink>
          <HeaderLogout onClick={logout}>Logout</HeaderLogout>
        </HeaderWarp>
      ) : (
        <HeaderWarp>
          <HeaderLoginLink to="/">Main</HeaderLoginLink>
          <HeaderLoginLink to={`/location`}> Location </HeaderLoginLink>
          <HeaderLoginLink to={`/community`}> Community </HeaderLoginLink>

          <HeaderLoginLink to="/login">Login</HeaderLoginLink>
        </HeaderWarp>
      )}
    </HeaderContainer>
  );
};
