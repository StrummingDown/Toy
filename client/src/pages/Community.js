import React from "react";

import { CommunityForm } from "../components/CommunityForm";
import { CommunityContainer, CommunityTitle, CreatePostLink } from "../css/Community";

export const Community = () => {
  return (
    <CommunityContainer>
      <CommunityTitle>게시판</CommunityTitle>
      <div style={{ textAlign: "right", marginRight: "20px" }}>
        <CreatePostLink to="/community/create/post">글 쓰기</CreatePostLink>
      </div>
      <CommunityForm />
    </CommunityContainer>
  );
};
