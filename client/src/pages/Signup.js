import React, { useState } from "react";
import { Title } from "../css/Login";
import {
  Container,
  PasswordCheckBtn,
  SignupBtn,
  SignupContainer,
  SignupError,
  SignupInput,
  SignupText,
} from "../css/Signup";
import axios from "axios";
import { useForm } from "react-hook-form";

const signup = async (userData) => {
  const data = await axios.post(`http://localhost:4000/users`, userData);
  return data;
};

export const Signup = () => {
  const [userInfo, setUserInfo] = useState({});

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
    getValues,
  } = useForm();

  const onSubmit = async (data) => {
    const userData = await signup(data);
    // await new Promise((r) => setTimeout(r, 1000));
  };
  return (
    <Container>
      <SignupContainer>왼쪽</SignupContainer>
      <SignupContainer onSubmit={handleSubmit(onSubmit)}>
        <Title>회원가입</Title>
        <SignupText>
          E-mail
          <SignupInput
            id="email"
            placeholder="Please Enter your E-mail"
            {...register("email", {
              required: "E-mail은 필수 사항입니다.",
              pattern: { value: /\S+@\S+\.\S+/, message: "올바른 이메일 형식을 입력해주세요." },
            })}
          />
        </SignupText>
        {errors.email && <SignupError role="alert">{errors.email.message}</SignupError>}
        <SignupText>
          Password
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
        <SignupText>
          Check Password
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
        <SignupText>
          Nickname{" "}
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
          <div>lcoation</div>
        </SignupText>
        <SignupBtn type="submit">가입하기</SignupBtn>
      </SignupContainer>
      <SignupContainer>오른쪽</SignupContainer>
    </Container>
  );
};
