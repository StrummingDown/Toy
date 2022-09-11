import React, { useState } from "react";
import { Container, FindIdBtn, FindIdContainer, FindIdInput, FindIdText, Title } from "../css/FindId";
import axios from "axios";
import { ResultId } from "../components/ResultId";
import { FindIdModal } from "../modal/FindIdModal";

export const FindId = () => {
  const [certifyNumber, setCertifyNumber] = useState(111111);
  const [inputCertifyNumber, setInputCertiyNumber] = useState(-1);
  const [checkNumber, setCheckNumber] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [idResult, setIdResult] = useState(false);
  const [userId, setUserId] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const sendCertifyNumber = async () => {
    if (phone.length < 11) {
      setModalContent("핸드폰 번호를 정확하게 입력해주세요.");
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
  const inputNumber = (e) => {
    setInputCertiyNumber(parseInt(e.target.value));
  };

  const findId = async () => {
    console.log("실행");
    const {
      data: { userId },
    } = await axios.post("http://localhost:4000/users/findId", { email });
    setUserId(userId);
    setIdResult(true);
  };

  const checkEmail = (e) => {
    var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    console.log("이메일 유효성 검사 :: ", regExp.test(e.target.value));
    return regExp.test(e.target.value);
  };
  return (
    <Container>
      {idResult ? (
        <FindIdContainer>
          <Title>아이디 찾기</Title>
          <ResultId userId={userId} />
        </FindIdContainer>
      ) : (
        <FindIdContainer>
          <Title>아이디 찾기</Title>
          <FindIdModal open={modalOpen} close={closeModal} header="인증번호 확인" content={modalContent} />

          <FindIdText>E-mail</FindIdText>
          <FindIdInput
            onBlur={checkEmail}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Please Enter your E-mail"
          />
          <FindIdText>핸드폰 번호</FindIdText>
          <FindIdInput onChange={(e) => setPhone(e.target.value)} placeholder="Please Enter your Phone" />
          <FindIdBtn onClick={sendCertifyNumber}>인증번호 전송</FindIdBtn>
          <FindIdText>인증번호</FindIdText>
          <FindIdInput onChange={inputNumber} placeholder="Please Enter Number" />
          <FindIdBtn
            onClick={() => {
              checkCertifyNumber();
            }}
          >
            인증번호 확인
          </FindIdBtn>
          <div style={{ textAlign: "center" }}>
            {/* {!checkNumber && inputCertifyNumber !== -1 ? <CheckText>인증 번호가 일치하지 않습니다!</CheckText> : ""} */}
            <FindIdBtn
              disabled={
                checkNumber &&
                checkEmail &&
                phone.length === 11 &&
                String(inputCertifyNumber).length === 6 &&
                String(certifyNumber).length === 6
                  ? false
                  : true
              }
              onClick={findId}
            >
              아이디 찾기
            </FindIdBtn>
          </div>
        </FindIdContainer>
      )}
    </Container>
  );
};
