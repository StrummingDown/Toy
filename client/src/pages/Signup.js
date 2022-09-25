import React, { useState } from "react";
import { Title } from "../css/Login";
import {
  Container,
  SignupBtn,
  SignupContainer,
  SignupError,
  SignupInput,
  SignupText,
  DuplicateBtn,
  SignupCategory,
} from "../css/Signup";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FindIdModal } from "../modal/FindIdModal";

// const signup = async (userData) => {
//   const data = await axios.post(`http://localhost:4000/users`, userData);
//   return data;
// };

export const Signup = () => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
    getValues,
  } = useForm();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [idCheck, setIdCheck] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  // console.log(getValues());
  const onSubmit = async (data) => {
    if (idCheck && emailCheck) {
      const userData = await axios.post(`http://localhost:4000/users`, data);
      nav("/");
      return userData;
      // await new Promise((r) => setTimeout(r, 1000));
    } else {
      setModalContent("아이디 또는 이메일 중복확인을 완료해주세요.");
      openModal();
    }
  };

  console.log(getValues());

  const checkDuplicateId = async () => {
    const id = await getValues().userId;

    if (id.length <= 1) {
      setModalContent("ID는 두 글자 이상 입력해 주세요.");
      openModal();
    } else {
      const { data: check } = await axios.post(`http://localhost:4000/users/duplicate/id`, { userId: id });

      if (!check) {
        setIdCheck(false);
        setModalContent("이미 존재하는 ID 입니다.");
        openModal();
      } else {
        setIdCheck(true);
        setModalContent("사용할 수 있는 ID 입니다.");
        openModal();
      }
    }
  };
  const checkDuplicateEmail = async () => {
    const email = await getValues().email;
    const emailRegex = /\S+@\S+\.\S+/;
    const emailCheck = emailRegex.test(email);
    console.log(emailCheck);
    if (email.length < 1 || !emailCheck) {
      setModalContent("올바른 이메일 형식을 입력해 주세요.");
      openModal();
    } else {
      const { data: check } = await axios.post(`http://localhost:4000/users/duplicate/email`, { userEmail: email });
      if (!check) {
        setEmailCheck(false);
        setModalContent("이미 존재하는 E-mail 입니다.");
        openModal();
      } else {
        setEmailCheck(true);
        setModalContent("사용할 수 있는 E-mail 입니다.");
        openModal();
      }
    }
  };

  return (
    <Container>
      <FindIdModal open={modalOpen} close={closeModal} header="중복확인" content={modalContent} />

      <SignupContainer onSubmit={handleSubmit(onSubmit)}>
        <Title>회원가입</Title>
        <SignupCategory> 아이디</SignupCategory>
        <SignupText>
          <SignupInput
            id="userId"
            placeholder="Please Enter your ID"
            {...register("userId", {
              required: "ID는 필수 사항입니다.",
              pattern: {
                value: /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,21}$/,
                message: "올바른 ID 형식을 입력해주세요.",
              },
            })}
          />
          <DuplicateBtn type="button" onClick={checkDuplicateId}>
            중복확인
          </DuplicateBtn>
        </SignupText>
        {errors.userId && <SignupError role="alert">{errors.userId.message}</SignupError>}
        <SignupCategory> 비밀번호 </SignupCategory>
        <SignupText>
          <SignupInput
            id="password"
            type="password"
            placeholder="Please Enter your Password"
            {...register("password", {
              required: "비밀번호는 필수 입력입니다.",
              pattern: {
                value: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/, // 8자리이상이면서 숫자와 문자의 조합이 필요한 정규식
                message: "문자 및 숫자를 조합한 8자리이상 비밀번호를 사용해주세요.",
              },
            })}
          />
        </SignupText>
        {errors.password && <SignupError role="alert">{errors.password.message}</SignupError>}
        <SignupCategory> 비밀번호 재확인 </SignupCategory>
        <SignupText>
          <SignupInput
            id="checkPassword"
            type="password"
            placeholder="Please Check your Password"
            {...register("checkPassword", {
              required: "비밀번호를 다시 입력해주세요.",
              validate: {
                matchesPreviousPassword: (value) => {
                  const { password } = getValues();
                  return password === value || "비밀번호가 일치하지 않습니다.";
                },
              },
            })}
          />
        </SignupText>
        {errors.checkPassword && <SignupError role="alert">{errors.checkPassword.message}</SignupError>}
        <SignupCategory>이메일 </SignupCategory>
        <SignupText>
          <SignupInput
            id="email"
            placeholder="Please Enter your E-mail"
            {...register("email", {
              required: "E-mail은 필수 사항입니다.",
              pattern: { value: /\S+@\S+\.\S+/, message: "올바른 이메일 형식을 입력해주세요." },
            })}
          />
          <DuplicateBtn type="button" onClick={checkDuplicateEmail}>
            중복확인
          </DuplicateBtn>
        </SignupText>
        {errors.email && <SignupError role="alert">{errors.email.message}</SignupError>}
        <SignupCategory>닉네임</SignupCategory>
        <SignupText>
          <SignupInput
            id="nickname"
            placeholder="Please Enter your Nickname"
            {...register("nickname", {
              required: "닉네임을 입력해주세요.",
              pattern: {
                value: /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/,
                message: "올바른 닉네임을 입력해주세요.",
              },
            })}
          />
        </SignupText>
        {errors.nickname && <SignupError role="alert">{errors.nickname.message}</SignupError>}
        <SignupText>
          <SignupCategory>위치</SignupCategory>
        </SignupText>
        <SignupBtn type="submit">가입하기</SignupBtn>
      </SignupContainer>
    </Container>
  );
};
