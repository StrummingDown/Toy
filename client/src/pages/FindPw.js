import axios from "axios";
import React, { useState } from "react";
import { ResultPw } from "../components/ResultPw";
import { Container, FindIdBtn, FindIdContainer, FindIdInput, FindIdText, Title } from "../css/FindId";
import { FindIdModal } from "../modal/FindIdModal";

export const FindPw = () => {
  const [checkId, setCheckId] = useState(false);
  const [certifyNumber, setCertifyNumber] = useState(111111);
  const [inputCertifyNumber, setInputCertiyNumber] = useState(-1);
  const [modalOpen, setModalOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [changePw, setChangePw] = useState("");
  const [phone, setPhone] = useState("");
  const [checkNumber, setCheckNumber] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const setId = (e) => {
    setUserId(e.target.value);
  };
  const checkUserId = async () => {
    const { data } = await axios.post("http://localhost:4000/users/checkId", { userId });
    setCheckId(data);
    if (!data) {
      setModalContent("존재하지 않는 ID입니다.");
      openModal();
    } else {
      setModalContent("아이디가 확인되었습니다.");
      openModal();
    }
  };
  const findUserPw = async () => {
    const { data: password } = await axios.post("http://localhost:4000/users/findPw", { userId }); // 구조분해할당 변수명 다르게 받기
    setChangePw(password);
  };

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const inputNumber = (e) => {
    console.log("여기", certifyNumber);
    setInputCertiyNumber(parseInt(e.target.value));
  };
  const sendCertifyNumber = async () => {
    if (phone.length < 11) {
      setModalContent("핸드폰 번호를 정확히 입력해주세요.");
      openModal();
    } else {
      setModalContent("인증번호를 전송했습니다.");
      openModal();

      const { data } = await axios.post("http://localhost:4000/users/certify", { phone });
      setCertifyNumber(data);
    }
  };
  const checkCertifyNumber = () => {
    if (certifyNumber === inputCertifyNumber) {
      setCheckNumber(true);
      setModalContent("인증번호가 일치합니다.");
      openModal();
    } else {
      setCheckNumber(false);
      setModalContent("인증번호가 일치하지 않습니다.");
      openModal();
    }
  };

  return (
    <Container>
      {changePw ? (
        <FindIdContainer>
          <ResultPw userPw={changePw} />
        </FindIdContainer>
      ) : (
        <FindIdContainer>
          <Title>비밀번호 찾기</Title>
          <FindIdModal open={modalOpen} close={closeModal} header="인증번호 확인" content={modalContent} />
          <FindIdText>ID</FindIdText>
          <FindIdInput onChange={setId} placeholder="Please Enter your ID" />
          <FindIdBtn onClick={checkUserId}>아이디 확인</FindIdBtn>
          <FindIdText>핸드폰 번호</FindIdText>
          <FindIdInput onChange={(e) => setPhone(e.target.value)} placeholder="Please Enter your Phone" />
          <FindIdBtn onClick={sendCertifyNumber}>인증번호 전송</FindIdBtn>
          <FindIdText>인증번호</FindIdText>
          <FindIdInput onChange={inputNumber} placeholder="Please Enter Number" />
          <FindIdBtn onClick={checkCertifyNumber}> 인증번호 확인</FindIdBtn>
          <div style={{ textAlign: "center" }}>
            <FindIdBtn disabled={checkId && checkNumber ? false : true} onClick={findUserPw}>
              비밀번호 찾기
            </FindIdBtn>
          </div>
        </FindIdContainer>
      )}
    </Container>
  );
};
