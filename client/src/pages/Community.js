import React from "react";
import { CommunityForm } from "../components/CommunityForm";
import { CommunityContainer, CommunityTitle } from "../css/Community";

export const Community = () => {
  return (
    <CommunityContainer>
      <CommunityTitle>게시판</CommunityTitle>
      <CommunityForm />
    </CommunityContainer>
  );
};
