import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  font-family: "Gaegu";
`;

export const SignupContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

export const SignupText = styled.div`
  /* display: flex; */
`;
export const SignupCategory = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin: 10px 0px;
`;

export const SignupInput = styled.input`
  height: 20px;
  width: 180px;
  font-family: "Gaegu";
`;
export const DuplicateBtn = styled.button`
  border-radius: 3px;
  box-shadow: 1px 1px 1px gray;
  background-color: skyblue;
  margin-left: 10px;

  &:active {
    box-shadow: inset -0.3rem -0.1rem 1.4rem #fbfbfb, inset 0.3rem 0.4rem 0.8rem #bec5d0;
    cursor: pointer;
  }
`;

export const SignupBtn = styled.button`
  border-radius: 10px;
  transition-duration: 0.3s;
  box-shadow: 3px 3px 3px black;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: skyblue;
  height: 40px;
  &:active {
    box-shadow: inset -0.3rem -0.1rem 1.4rem #fbfbfb, inset 0.3rem 0.4rem 0.8rem #bec5d0;
    cursor: pointer;
  }
`;

export const SignupError = styled.small`
  color: red;
`;
