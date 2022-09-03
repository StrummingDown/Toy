import React, { useState } from "react";
import {
  CheckText,
  Container,
  CorrectText,
  FindIdBtn,
  FindIdContainer,
  FindIdInput,
  FindIdText,
  Title,
} from "../css/FindId";
import axios from "axios";
import { ResultId } from "../components/ResultId";

export const FindId = () => {
  const [certifyNumber, setCertifyNumber] = useState(0);
  const [checkNumber, setCheckNumber] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [idResult, setIdResult] = useState(false);
  const [userId, setUserId] = useState("");

  const sendCertifyNumber = async () => {
    alert("인증번호를 전송했습니다.");
    const { data } = await axios.post("http://localhost:4000/users/certify", { phone });
    setCertifyNumber(data);
  };
  const checkCertifyNumber = () => {};
  const inputNumber = (e) => {
    console.log(certifyNumber, e.target.value);
    if (certifyNumber === parseInt(e.target.value)) {
      setCheckNumber(true);
    } else {
      setCheckNumber(false);
    }
  };

  const findId = async () => {
    console.log("실행");
    const {
      data: { userId },
    } = await axios.post("http://localhost:4000/users/findId", { email });
    setUserId(userId);
    setIdResult(true);
  };
  return (
    <Container>
      <FindIdContainer>왼쪽</FindIdContainer>

      {idResult ? (
        <FindIdContainer>
          <Title>아이디 찾기</Title>
          <ResultId userId={userId} />
        </FindIdContainer>
      ) : (
        <FindIdContainer>
          <Title>아이디 찾기</Title>
          <FindIdText>E-mail</FindIdText>
          <FindIdInput onChange={(e) => setEmail(e.target.value)} placeholder="Please Enter your E-mail" />
          <FindIdText>핸드폰 번호</FindIdText>
          <FindIdInput onChange={(e) => setPhone(e.target.value)} placeholder="Please Enter your Phone" />
          <FindIdBtn onClick={sendCertifyNumber}>인증번호 전송</FindIdBtn>
          <FindIdText>인증번호</FindIdText>
          <FindIdInput onChange={inputNumber} placeholder="Please Enter Number" />
          <FindIdBtn onClick={checkCertifyNumber}>인증번호 확인</FindIdBtn>
          <div style={{ textAlign: "center" }}>
            {!checkNumber ? (
              <CheckText>인증 번호가 일치하지 않습니다!</CheckText>
            ) : (
              <CorrectText>인증 번호가 일치합니다.</CorrectText>
            )}
            <FindIdBtn onClick={findId}>아이디 찾기</FindIdBtn>
          </div>
        </FindIdContainer>
      )}

      <FindIdContainer>오른쪽</FindIdContainer>
    </Container>
  );
};
