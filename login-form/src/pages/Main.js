import React from "react";
import { useNavigate } from "react-router-dom";

export const Main = () => {
  const navigate = useNavigate();
  const loginBtn = (event) => {
    navigate("/login");
  };
  return (
    <div>
      <h1>Main</h1>
      <button onClick={loginBtn}>go to login</button>
    </div>
  );
};
