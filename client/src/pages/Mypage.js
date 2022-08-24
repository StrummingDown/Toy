import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  Container,
  MypageContainer,
  MypageTitle,
  MypageContent,
  MypageBtn,
  MypageBtnWrap,
  MypageContentUpdate,
  MypageUpdateContainer,
  MypageUpdateContent,
} from "../css/Mypage";
import { loginStatus, userInfo } from "../store";

export const Mypage = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const userData = useRecoilValue(userInfo);
  const [isLogin, setIsLogin] = useRecoilState(loginStatus);
  const nav = useNavigate();

  //   console.log(useRecoilValue(ex));
  const withdrawal = async () => {
    const email = window.localStorage.getItem("email");
    await axios.delete(`http://localhost:4000/users`, { data: { email } });
    setIsLogin(false);
    nav("/");
  };

  const updateUser = () => {
    setIsUpdate(!isUpdate);
  };

  const updateUserSubmit = async () => {
    const email = window.localStorage.getItem("email");
    const updateData = await axios.patch(`http://localhost:4000/users`, { email });
    console.log(updateData);
    setIsUpdate(!isUpdate);
  };

  const myInfo = async () => {
    const email = window.localStorage.getItem("email");

    const { data } = await axios.post(`http://localhost:4000/users/mypage`, { email });
    return data;
  };

  return (
    <Container>
      <MypageContainer>왼쪽</MypageContainer>

      {isUpdate ? (
        <div>
          <MypageTitle>내 정보 수정</MypageTitle>
          <div style={{ display: "flex", justifyContent: "left", textAlign: "left" }}>
            <MypageUpdateContainer>
              <MypageUpdateContent>
                ID : <MypageContentUpdate />
              </MypageUpdateContent>
              <MypageUpdateContent>
                Nickname : <MypageContentUpdate />
              </MypageUpdateContent>
              <MypageUpdateContent>
                E-mail : <MypageContentUpdate />
              </MypageUpdateContent>
              <MypageUpdateContent>
                Location : <MypageContentUpdate />
              </MypageUpdateContent>
            </MypageUpdateContainer>
          </div>
          <MypageBtnWrap>
            <MypageBtn onClick={updateUser}>수정 완료</MypageBtn>
          </MypageBtnWrap>
        </div>
      ) : (
        <MypageContainer>
          <MypageTitle>마이페이지</MypageTitle>
          <MypageContent>{`ID : ${userData.id}`}</MypageContent>
          <MypageContent>{`Nickname : ${userData.nickname}`}</MypageContent>
          <MypageContent>{`E-mail : ${userData.email}`}</MypageContent>
          <MypageContent>{`Location : ${userData.location}`}</MypageContent>
          <MypageBtnWrap>
            <MypageBtn onClick={updateUser}>수정하기</MypageBtn>
            <MypageBtn onClick={withdrawal}>탈퇴하기</MypageBtn>
          </MypageBtnWrap>
        </MypageContainer>
      )}

      <MypageContainer>오른쪽</MypageContainer>
    </Container>
  );
};
