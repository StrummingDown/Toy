import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FindIdContainer = styled.div``;

export const FindIdInput = styled.input`
  margin: 0px 5px 5px 0px;
  width: 160px;
`;

export const Title = styled.h2``;

export const FindIdText = styled.div`
  font-weight: bold;
  margin: 5px 0px;
`;

export const FindIdBtn = styled.button`
  background-color: skyblue;
  border: 1px solid black;
  border-radius: 5px;
  margin: 0px 2px;

  &:active {
    box-shadow: inset -0.3rem -0.1rem 1.4rem #fbfbfb, inset 0.3rem 0.4rem 0.8rem #bec5d0;
    cursor: pointer;
  }
`;
export const FindIdLink = styled(Link)``;

export const CheckText = styled.div`
  color: red;
`;
export const CorrectText = styled.div`
  color: blue;
`;
