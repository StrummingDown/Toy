import React from "react";
import { Container, FindIdBtn, FindIdContainer, FindIdInput, FindIdText, Title } from "../css/FindId";
import axios from "axios";

export const FindId = () => {
  let cnt = 0;
  const timestamp = Date.now().toString();
  const serviceId = "ncp:sms:kr:291860026013:sms_certify";
  const sendCertifyNumber = async () => {
    const data = await axios.post(
      `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`,
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "x-ncp-apigw-timestamp": timestamp,
          "x-ncp-iam-access-key": "3VS7DXEJO5nJmUbtJgdE",
          "x-ncp-apigw-signature-v2": "RvtrDPOZi4AnXKMxxUaAgvZADm5TAUd3XhNhL1wo",
        },
      },
      {
        type: "SMS",
        contentType: "COMM",
        countryCode: "82",
        from: "01039022841",
        subject: "string",
        content: "string",
        messages: [
          {
            to: "윤대규",
            subject: "테스트",
            content: "연습입니다.",
          },
        ],
      }
    );
    // alert("인증번호를 전송했습니다.");
    console.log(`인증데이터 :${cnt}`, data);
    cnt += 1;
  };
  return (
    <Container>
      <FindIdContainer>왼쪽</FindIdContainer>
      <FindIdContainer>
        <Title>아이디 찾기</Title>
        <FindIdText>E-mail</FindIdText>
        <FindIdInput placeholder="Please Enter your E-mail" />
        <FindIdBtn onClick={sendCertifyNumber}>인증번호 전송</FindIdBtn>
        <FindIdText>인증번호</FindIdText>
        <FindIdInput placeholder="Please Enter Number" /> <FindIdBtn>아이디 찾기</FindIdBtn>
      </FindIdContainer>
      <FindIdContainer>오른쪽</FindIdContainer>
    </Container>
  );
};
