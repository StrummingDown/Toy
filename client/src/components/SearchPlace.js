import React, { useState } from "react";
import { Location } from "../pages/Location";

const SearchPlace = () => {
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h2>위치 검색</h2>
        <form className="inputForm" onSubmit={handleSubmit}>
          <input style={{ width: "200px" }} placeholder="장소를 입력하세요." onChange={onChange} value={inputText} />
          <button type="submit">검색</button>
        </form>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <Location searchPlace={place} />
      </div>
    </>
  );
};

export default SearchPlace;
