import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  font-family: "Gaegu";
`;

export const MypageContainer = styled.div``;

export const MypageUpdateContainer = styled.form`
  /* justify-content: left; */
`;

export const MypageContentWrap = styled.div`
  border: solid skyblue;
  background-color: lightblue;
  border-radius: 15px;
  padding: 10px 30px;
`;

export const MypageTitle = styled.h2`
  font-size: 30px;
  text-align: center;
`;

export const MypageContent = styled.div`
  margin: 30px 0px;
  font-size: 22px;
`;
export const MypageUpdateContent = styled(MypageContent)`
  margin: 10px 0px;
  text-align: right;
`;

export const MypageBtn = styled.button`
  width: 80px;
  margin: 4px;
  border-radius: 10px;
  font-size: 16px;
  background-color: skyblue;
  font-family: "Gaegu";
  font-weight: bold;
  cursor: pointer;
  &:active {
    box-shadow: inset -0.3rem -0.1rem 1.4rem #fbfbfb, inset 0.3rem 0.4rem 0.8rem #bec5d0;
    cursor: pointer;
  }
`;

export const MypageBtnWrap = styled.div`
  display: flex;
  /* width: 300px; */
  margin: 5px;
  justify-content: space-around;
`;

export const MypageContentUpdate = styled.input`
  margin: 5px 5px;
  height: 28px;
  width: 160px;
  font-family: "Gaegu";
  font-weight: bold;
`;
export const MypageInput = styled.input``;
