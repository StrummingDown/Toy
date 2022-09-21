import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
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
  MypageContentWrap,
} from "../css/Mypage";
import { loginStatus, userInfo, userToken } from "../store";

export const MypageInfo = ({ token }) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [userData, setUserData] = useRecoilState(userInfo);
  const [userId, setUserId] = useState(userData.userId);
  const [nickname, setNickname] = useState(userData.nickname);
  const [email, setEmail] = useState(userData.email);
  const [location, setLocation] = useState(userData.location);
  const [isLogin, setIsLogin] = useRecoilState(loginStatus);
  const deleteToken = useResetRecoilState(userToken);
  const nav = useNavigate();

  // console.log("내정보렌더링", userData);
  const saveUserData = async () => {
    // const { userId, nickname, email, location } = await data;
    //   setUserId(userId);
    // setNickname(nickname);
    //   setEmail(email);
    // setLocation(location);
  };
  saveUserData();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
    getValues,
  } = useForm();

  const withdrawal = async () => {
    await axios.delete(`http://localhost:4000/users`, { data: { token } });
    deleteToken();
    setIsLogin(false);
    nav("/");
  };

  const updateUser = () => {
    setIsUpdate(!isUpdate);
  };
  const updateUserSubmit = async (event) => {
    event.preventDefault();
    // console.log("업데이트", userId, nickname, userId);
    const { data } = await axios.patch(`http://localhost:4000/users`, { userId, nickname, email });

    setUserData(data);
    setIsUpdate(!isUpdate);
  };
  const changePw = () => {
    nav("/mypage/change/pw");
  };

  return (
    <div>
      {isUpdate ? (
        <Container>
          <MypageContainer>
            <MypageTitle>내 정보 수정</MypageTitle>
            <div style={{ display: "flex", justifyContent: "left", textAlign: "left" }}>
              <MypageUpdateContainer onSubmit={updateUserSubmit}>
                <MypageUpdateContent>
                  ID :
                  <MypageContentUpdate
                    type="text"
                    value={userData.userId}
                    {...register("id", {
                      onChange: (e) => {
                        setUserId(e.target.value);
                      },
                      minLength: 4,
                    })}
                  />
                </MypageUpdateContent>
                <MypageUpdateContent>
                  Nickname :
                  <MypageContentUpdate
                    type="text"
                    value={nickname}
                    {...register("nickname", {
                      onChange: (e) => {
                        setNickname(e.target.value);
                      },
                      pattern: {
                        value: /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/,
                        message: "올바른 닉네임을 입력해주세요.",
                      },
                    })}
                  />
                </MypageUpdateContent>
                <MypageUpdateContent>
                  E-mail :
                  <MypageContentUpdate
                    type="text"
                    value={email}
                    {...register("email", {
                      onChange: (e) => {
                        setEmail(e.target.value);
                      },
                      required: "E-mail은 필수 사항입니다.",
                      pattern: { value: /\S+@\S+\.\S+/, message: "올바른 이메일 형식을 입력해주세요." },
                    })}
                  />
                </MypageUpdateContent>
                <MypageUpdateContent>
                  Location :
                  <MypageContentUpdate
                    type="text"
                    value={userData.location}
                    {...register("location", {
                      required: "E-mail은 필수 사항입니다.",
                      pattern: { value: /\S+@\S+\.\S+/, message: "올바른 이메일 형식을 입력해주세요." },
                    })}
                  />
                </MypageUpdateContent>
                <MypageBtnWrap>
                  <MypageBtn type="submit">수정 완료</MypageBtn>
                </MypageBtnWrap>
              </MypageUpdateContainer>
            </div>
          </MypageContainer>
        </Container>
      ) : (
        <MypageContainer>
          <MypageTitle>마이페이지</MypageTitle>
          <MypageContentWrap>
            <MypageContent>{`ID : ${userId}`}</MypageContent>
            <MypageContent>{`Nickname : ${nickname}`}</MypageContent>
            <MypageContent>{`E-mail : ${email}`}</MypageContent>
            <MypageContent>{`Location : ${location}`}</MypageContent>
          </MypageContentWrap>
          <MypageBtnWrap>
            <MypageBtn onClick={changePw}>비밀번호 변경하기</MypageBtn>
            <MypageBtn onClick={updateUser}>회원정보 수정하기</MypageBtn>
            <MypageBtn onClick={withdrawal}>탈퇴하기</MypageBtn>
          </MypageBtnWrap>
        </MypageContainer>
      )}
    </div>
  );
};
