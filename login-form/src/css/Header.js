import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background: linear-gradient(to right, white 20%, skyblue);
`;
export const HeaderBgColor = styled.div`
  background: linear-gradient(to right, white, blue);
  display: flex;
  align-items: right;
  text-align: right;
  width: 400px;
`;

export const HeaderIcon = styled.img`
  height: 55px;
  width: 70px;
`;

export const HeaderLoginLink = styled(Link)`
  display: flex;
  align-items: center;
  margin-right: 40px;
  color: black;
  text-decoration: none;
`;

export const HeaderWarp = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: right;
  text-align: right;
`;
