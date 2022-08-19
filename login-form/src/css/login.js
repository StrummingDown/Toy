import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: red;
  height: auto;
`;

export const LoginContainer = styled.form`
  display: flex;
  flex-direction: column;
  background-color: blue;
  height: 240px;
`;

export const LoginText = styled.div`
  display: flex;
  justify-content: right;
  margin: 0px 10px;
  background-color: yellow;
  align-items: center;
  height: 40px;
`;

export const FinderText = styled(LoginText)`
  justify-content: center;
`;

export const LoginInput = styled.input`
  margin-left: 10px;
  height: 20px;
  width: 170px;
`;

export const LoginBtnDiv = styled.div`
  text-align: center;
  margin-top: 10px;
`;
export const LoginBtn = styled.button`
  width: 200px;
  border-radius: 10px;
  font-size: 20px;
`;

export const Title = styled.h2`
  text-align: center;
`;

export const SubBtn = styled.button`
  margin: 5px;
`;
export const SubLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 12px;
  margin: 0px 10px;
`;
