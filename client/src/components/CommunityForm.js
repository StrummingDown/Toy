import React from "react";
import {
  CommunityCategory,
  CommunityCategoryWrap,
  CommunityCategoryContent,
  CommunityContentTitle,
  CommunityContentWrap,
} from "../css/Community";
export const CommunityForm = () => {
  return (
    <CommunityCategoryWrap>
      <CommunityContentWrap>
        <CommunityCategory>번호</CommunityCategory>
        <CommunityContentTitle to="/community/1">12301</CommunityContentTitle>
      </CommunityContentWrap>
      <CommunityContentWrap>
        <CommunityCategory>제목</CommunityCategory>
        <CommunityContentTitle to="/community/1"> 핸드폰을 잃어버렸습니다..ㅜ</CommunityContentTitle>
      </CommunityContentWrap>
      <CommunityContentWrap>
        <CommunityCategory>글쓴이</CommunityCategory>
        <CommunityCategoryContent>멍청이</CommunityCategoryContent>
      </CommunityContentWrap>
      <CommunityContentWrap>
        <CommunityCategory>날짜</CommunityCategory>
        <CommunityCategoryContent>2022.09.16</CommunityCategoryContent>
      </CommunityContentWrap>
      <CommunityContentWrap>
        <CommunityCategory>조회 수</CommunityCategory>
        <CommunityCategoryContent>11232</CommunityCategoryContent>
      </CommunityContentWrap>
      <CommunityContentWrap>
        <CommunityCategory>추천 수</CommunityCategory>
        <CommunityCategoryContent>32</CommunityCategoryContent>
      </CommunityContentWrap>
    </CommunityCategoryWrap>
  );
};
