import axios from "axios";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import {
  Container,
  MypageBtn,
  MypageContainer,
  MypageContent,
  MypageContentUpdate,
  MypageTitle,
  MypageUpdateContent,
} from "../css/Mypage";
import { userInfo } from "../store";

export const ChangePw = () => {
  const [currentPw, setCurrentPw] = useState("");
  const [changePw, setChangePw] = useState("");
  const [checkPw, setCheckPw] = useState("");
  const { userId } = useRecoilValue(userInfo);

  const updateUserPw = async () => {
    await axios.post("http://localhost:4000/users/changePW", { userId, currentPw, changePw });
  };

  return (
    <Container>
      <MypageContainer>왼쪽</MypageContainer>
      <MypageContainer>
        <MypageUpdateContent>
          <MypageTitle>비밀번호 수정</MypageTitle>
          <MypageContent>
            {`현재 비밀번호 : `}
            <MypageContentUpdate onChange={(e) => setCurrentPw(e.target.value)} type="password" />
          </MypageContent>
        </MypageUpdateContent>
        <MypageContent>
          <MypageUpdateContent>
            {`변경할 비밀번호 : `}
            <MypageContentUpdate onChange={(e) => setChangePw(e.target.value)} type="password" />
          </MypageUpdateContent>
        </MypageContent>
        <MypageContent>
          {`변경할 비밀번호 확인 : `}
          <MypageContentUpdate onChange={(e) => setCheckPw(e.target.value)} type="password" />
        </MypageContent>
        <MypageContent>
          <MypageBtn onClick={updateUserPw} style={{ display: "block", margin: "auto", width: "140px" }}>
            비밀번호 변경
          </MypageBtn>
        </MypageContent>
      </MypageContainer>

      <MypageContainer>오른쪽</MypageContainer>
    </Container>
  );
};
