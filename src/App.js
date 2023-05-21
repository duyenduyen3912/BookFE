import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./page/Login/index";
import ListBook from "./page/ListBook/ListBook";
import Detail from "./page/Detail/Detail";
import Signup from "./page/Signup";
import Home from "./page/Home";
import BookDetail from "./page/BookDetail/BookDetail";
import Cart from "./page/BookCart/Cart";
import Order from "./page/BookOrder/Order";
import Loader from "./component/Loader";
import { useState, CSSProperties, useEffect } from "react";
import UserInfor from "./page/UserInfor";
import Search from "./page/Search";
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ListBook />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/book/:idBook" element={<Detail />} />
        <Route path="/home" element={<Home />} />
        <Route path="/book-detail/:id" element={<BookDetail />} />
        <Route path="/book-cart" element={<Cart />} />
        <Route path="/book-order" element={<Order />} />
        <Route
          path="/user-infor/:username"
          element={localStorage.getItem("username") ? <UserInfor /> : <Login />}
        />
        <Route path="/search/:key" element={<Search />} />
        <Route path="/search/" element={<Search />} />
      </Routes>
    </>
  );
}

export default App;
