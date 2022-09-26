import { Link } from "react-router-dom";
import styled from "styled-components";

export const CommunityContainer = styled.div`
  font-family: "Gaegu";
`;

export const CommunityTitle = styled.h1`
  text-align: center;
  /* align-items: "center"; */
`;

export const Writer = styled.h3`
  text-align: right;
  margin-right: 80px;
`;
export const Views = styled.h4`
  text-align: right;
  margin-right: 80px;
  margin-top: -10px;
`;
export const List = styled.h4`
  text-align: right;
  margin-right: 80px;
  margin-top: -10px;
`;
export const ListLink = styled(Link)`
  color: white;
  background-color: skyblue;
  font-size: 20px;
  text-decoration: none;
  padding: 5px 5px;
`;
export const CommunityContent = styled.div`
  font-size: 16px;
  border: solid;
  margin: 10px 80px;
`;
export const CommunityCategoryWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px 100px;
`;
export const CommunityContentWrap = styled.div`
  text-align: center;
`;
export const CommunityContentTitle = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 16px;
`;
export const CommunityCategoryContent = styled.div`
  font-size: 16px;
`;
// export const Community
export const CommunityCategory = styled.h3``;
// export const Community

export const CreatePostLink = styled(Link)`
  color: white;
  background-color: skyblue;
  font-size: 20px;
  text-decoration: none;
  padding: 5px 5px;
`;

export const CreatePostCategory = styled.h2`
  text-align: center;
  margin-right: 20px;
`;
export const CreatePostInputTitle = styled.textarea`
  width: 300px;
  height: 30px;
  font-family: "Gaegu";
  font-size: 20px;
  border: 0;
  border-radius: 15px;
  background-color: rgb(233, 233, 233);
  padding: 5px;
  resize: none;
  margin-bottom: -20px;
`;

export const CreatePostInputContent = styled(CreatePostInputTitle)`
  height: 300px;
  width: 500px;
  margin-bottom: 40px;
  padding: 10px;
`;
export const CreatePostInputWrap = styled.div`
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;
export const CreatePostWrap = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

export const CreatePostBtn = styled.button`
  height: 40px;
  width: 160px;
  border-radius: 10px;
  font-size: 20px;
  background-color: skyblue;
  font-family: "Gaegu";
  align-items: center;
`;
