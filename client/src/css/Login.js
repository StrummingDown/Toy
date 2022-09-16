import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  height: 60%;
  width: 100%;
  font-family: "Gaegu";
`;

export const LoginContainer = styled.form`
  display: flex;
  /* flex-direction: column; */
  border-style: solid;
  border-color: skyblue;
  border-radius: 10px;
  border-width: 3px;
  width: 400px;
  height: 400px;
  background-color: lightblue;
`;

export const LoginText = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  margin: 20px 10px;
  height: 30%;
  width: 80%;
`;

export const FinderText = styled(LoginText)`
  justify-content: center;
  margin-top: -20px;
  width: 100%;

  /* height: 90%; */
`;

export const LoginInput = styled.input`
  margin-left: 10px;
  height: 30px;
  border: inset 1px;
  border-radius: 10px;
  width: 60%;
`;

export const LoginBtnDiv = styled.div`
  text-align: center;
  margin-top: 20px;
`;
export const LoginBtn = styled.button`
  width: 60%;
  height: 40px;
  border-radius: 10px;
  font-size: 20px;
  background-color: skyblue;
  font-family: "Gaegu";
  &:active {
    box-shadow: inset -0.3rem -0.1rem 1.4rem #fbfbfb, inset 0.3rem 0.4rem 0.8rem #bec5d0;
    cursor: pointer;
  }
`;

export const Title = styled.h2`
  text-align: center;
  margin-top: 60px;
`;

export const SubBtn = styled.button`
  margin: 5px;
`;
export const SubLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 20px;
  margin: 0px 10px;
`;
