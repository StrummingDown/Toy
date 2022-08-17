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
  height: 200px;
`;

export const LoginText = styled.div`
  display: flex;
  justify-content: right;
  margin: 0px 10px;
  background-color: yellow;
  align-items: center;
  height: 40px;
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
`;
