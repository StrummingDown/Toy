import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const MypageContainer = styled.div``;

export const MypageTitle = styled.h2`
  font-size: 30px;
`;

export const MypageContent = styled.div`
  margin: 10px 0px;
`;

export const MypageBtn = styled.button`
  width: 80px;
  border-radius: 10px;
  font-size: 16px;
  background-color: skyblue;
  &:active {
    box-shadow: inset -0.3rem -0.1rem 1.4rem #fbfbfb, inset 0.3rem 0.4rem 0.8rem #bec5d0;
    cursor: pointer;
  }
`;

export const MypageBtnWrap = styled.div`
  display: flex;
  justify-content: space-around;
`;
