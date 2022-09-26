import React, { useState } from "react";
import {
  CommunityContainer,
  CommunityTitle,
  CreatePostCategory,
  CreatePostInput,
  CreatePostInputWrap,
  CreatePostWrap,
  CreatePostInputTitle,
  CreatePostInputContent,
  CreatePostBtn,
} from "../css/Community";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userToken } from "../store";

export const CreatePost = () => {
  const token = useRecoilValue(userToken);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createPost = async () => {
    const data = await axios.post(`http://localhost:4000/posts`, { token, title, content });
    console.log(data);
  };
  return (
    <CommunityContainer>
      <CommunityTitle>글 쓰기</CommunityTitle>
      <CreatePostWrap>
        <CreatePostCategory>제목 </CreatePostCategory>
        <CreatePostInputWrap>
          <CreatePostInputTitle onChange={(e) => setTitle(e.target.value)} />
        </CreatePostInputWrap>
      </CreatePostWrap>
      <CreatePostCategory>내용 </CreatePostCategory>
      <CreatePostInputWrap>
        <CreatePostInputContent onChange={(e) => setContent(e.target.value)} />
        <CreatePostBtn onClick={createPost}>작성하기</CreatePostBtn>
      </CreatePostInputWrap>
    </CommunityContainer>
  );
};
