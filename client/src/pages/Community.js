import React from "react";
import { useRecoilValue } from "recoil";
import { CommunityForm } from "../components/CommunityForm";
import { CommunityContainer, CommunityTitle, CreatePostLink } from "../css/Community";
import { userToken } from "../store";

export const Community = () => {
  const token = useRecoilValue(userToken);
  return (
    <CommunityContainer>
      <CommunityTitle>게시판</CommunityTitle>
      {token && (
        <div style={{ textAlign: "right", marginRight: "20px" }}>
          <CreatePostLink to="/community/create/post">글 쓰기</CreatePostLink>
        </div>
      )}
      <CommunityForm />
    </CommunityContainer>
  );
};
