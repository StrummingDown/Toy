import React from "react";
import { Container, FooterA, FooterText, GithubImg } from "../css/Footer";
import githubImg from "../imgs/github.png";

export const Footer = () => {
  return (
    <Container>
      <FooterText>Toy Project</FooterText>
      <FooterText>copyright &copy; by Yun Dae Gyu</FooterText>
      <FooterText>Contact Me : mylove0330@nate.com</FooterText>
      <FooterText>
        <GithubImg src={githubImg} /> <FooterA href="https://github.com/StrummingDown">StrummingDown</FooterA>
      </FooterText>
    </Container>
  );
};
