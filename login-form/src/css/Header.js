import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
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
