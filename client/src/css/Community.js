import { Link } from "react-router-dom";
import styled from "styled-components";

export const CommunityContainer = styled.div`
  font-family: "Gaegu";
`;

export const CommunityTitle = styled.h1`
  text-align: center;
  /* align-items: "center"; */
`;

export const CommunityCategoryWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px 100px;
`;
export const CommunityContentWrap = styled.div`
  text-align: center;
`;
export const CommunityContent = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 16px;
`;
export const CommunityCategory = styled.h3``;
// export const Community
