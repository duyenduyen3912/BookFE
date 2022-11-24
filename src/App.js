import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./page/Login/Login";
import Signup from "./page/Signup/Signup";
import ListBook from "./page/ListBook/ListBook";
import Detail from "./page/Detail/Detail";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ListBook />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/book/:id" element={<Detail />} />

        {/* <Route path="/laptops/${id}" element={<Laptop />} /> */}
      </Routes>
    </>
  );
}

export default App;
