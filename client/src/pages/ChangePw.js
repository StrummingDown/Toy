import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { FindIdModal } from "../modal/FindIdModal";
import { userInfo } from "../store";

export const ChangePw = () => {
  const [currentPw, setCurrentPw] = useState("");
  const [changePw, setChangePw] = useState("");
  const [checkPw, setCheckPw] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [completeChangePw, setCompleteChangePw] = useState(false);
  const { userId } = useRecoilValue(userInfo);
  const nav = useNavigate();

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    if (completeChangePw) {
      nav("/");
    }
  };
  const updateUserPw = async () => {
    const { data } = await axios.post("http://localhost:4000/users/changePW", { userId, currentPw, changePw });

    if (data && changePw === checkPw) {
      console.log("변경");
      setCompleteChangePw(true);
      setModalContent("비밀번호가 변경되었습니다.");
      openModal();
    } else {
      setModalContent("비밀번호를 확인해주세요.");
      openModal();
    }
  };

  return (
    <Container>
      <MypageContainer>왼쪽</MypageContainer>
      <MypageContainer>
        <FindIdModal open={modalOpen} close={closeModal} header="비밀번호 변경" content={modalContent} />
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
