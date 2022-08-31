import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Main } from "./pages/Main";
import { FindId } from "./pages/FindId";
import { Mypage } from "./pages/Mypage";
import { FindPw } from "./pages/FindPw";

export const Routers = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/find/id" exact element={<FindId />} />
        <Route path="/find/pw" exact element={<FindPw />} />
        <Route path="/mypage/:id" exact element={<Mypage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
