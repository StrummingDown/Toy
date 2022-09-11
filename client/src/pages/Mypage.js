import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { MypageInfo } from "../components/MypageInfo";
import { Container, MypageContainer } from "../css/Mypage";
import { userToken, userInfo } from "../store";

export const Mypage = () => {
  const resetUserInfo = useResetRecoilState(userInfo);
  const expriedToken = useResetRecoilState(userToken);
  const token = useRecoilValue(userToken);
  const [user, setUser] = useState();
  const nav = useNavigate();
  const myInfo = async () => {
    const { data } = await axios.post(`http://localhost:4000/users/mypage`, { token });
    console.log("마이페이지", data);
    setUser(data);
    if (!data) {
      expriedToken();
      resetUserInfo();
      window.alert("토큰이 만료되었습니다. 로그인을 다시 해주세요.");
      nav("/");
    }
    // console.log("마이페이지 렌더링");
    return data;
  };
  useEffect(() => {
    myInfo();
  }, []);
  console.log("유저데이터", user);
  // const getMyInfo = async () => {
  //   const userData = await myInfo();
  //   console.log(userData);
  //   return userData;
  // };

  // useEffect(() => {
  //   console.log(typeof userData);
  //   if (typeof userData === "object") {
  //     // 경고문떄문에 이펙트안에서 실행..
  //     nav("/");
  //   }
  // }, []);

  return (
    <Container>
      <MypageInfo />
    </Container>
  );
};
