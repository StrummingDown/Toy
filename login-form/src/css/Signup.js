import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SignupText = styled.div`
  display: flex;
  margin: 2px 0px;
  justify-content: space-between;
`;

export const SignupInput = styled.input`
  margin: 0px 10px;
  height: 20px;
  width: 180px;
`;

export const SignupBtn = styled.button`
  border-radius: 10px;
  transition-duration: 0.3s;
  box-shadow: 3px 3px 3px black;
  margin-top: 20px;
`;
