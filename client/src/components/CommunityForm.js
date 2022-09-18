import React from "react";
import { CommunityCategory, CommunityCategoryWrap, CommunityContent, CommunityContentWrap } from "../css/Community";
export const CommunityForm = () => {
  return (
    <CommunityCategoryWrap>
      <CommunityContentWrap>
        <CommunityCategory>번호</CommunityCategory>
        <CommunityContent to="/community/1">12301</CommunityContent>
      </CommunityContentWrap>
      <CommunityContentWrap>
        <CommunityCategory>제목</CommunityCategory>
        <CommunityContent to="/community/1"> 핸드폰을 잃어버렸습니다..ㅜ</CommunityContent>
      </CommunityContentWrap>
      <CommunityContentWrap>
        <CommunityCategory>글쓴이</CommunityCategory>
        <CommunityContent to="/community/1">멍청이</CommunityContent>
      </CommunityContentWrap>
      <CommunityContentWrap>
        <CommunityCategory>날짜</CommunityCategory>
        <CommunityContent to="/community/1">2022.09.16</CommunityContent>
      </CommunityContentWrap>
      <CommunityContentWrap>
        <CommunityCategory>조회 수</CommunityCategory>
        <CommunityContent to="/community/1">11232</CommunityContent>
      </CommunityContentWrap>
      <CommunityContentWrap>
        <CommunityCategory>추천 수</CommunityCategory>
        <CommunityContent to="/community/1">32</CommunityContent>
      </CommunityContentWrap>
    </CommunityCategoryWrap>
  );
};
