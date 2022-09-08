import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;

export const LoginContainer = styled.form`
  display: flex;
  flex-direction: column;
  border-style: solid;
  border-color: skyblue;
  border-radius: 10px;
  border-width: 3px;
  margin: 20px 0px;
  background-color: lightblue;
  height: 100%;
`;

export const LoginText = styled.div`
  display: flex;
  justify-content: right;
  margin: 2px 10px;

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
  background-color: skyblue;
  &:active {
    box-shadow: inset -0.3rem -0.1rem 1.4rem #fbfbfb, inset 0.3rem 0.4rem 0.8rem #bec5d0;
    cursor: pointer;
  }
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
