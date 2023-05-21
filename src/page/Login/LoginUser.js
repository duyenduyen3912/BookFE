import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

const cx = classNames.bind(styles);
function LoginUser() {
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const submitForm = (event) => {
    event.preventDefault();
    setValidated(true);
    const form = document.getElementById("submitForm");
    console.log(form.checkValidity());
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else if (form.checkValidity() === true) {
      fetch(string, {
        method: "get",
        mode: "cors",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.password === user.password) {
            localStorage.setItem("isLoginUser", true);
            localStorage.setItem("username", data.username);
            localStorage.setItem("img", data.img);
            localStorage.setItem("idUser", data.idUser);
            navigate(`/home`);
          } else {
            alert("Sai tài khoản hoặc mật khẩu");
          }
        });
    }
  };

  let string = "http://localhost:8080/user/" + user.username;
  return (
    <div>
      <div className={cx("title")}>LOGIN AS USER</div>
      <Form
        className="form-Detail"
        noValidate
        validated={validated}
        id="submitForm"
      >
        <div className={cx("row-input")}>
          <Form.Group controlId="validationCustom01">
            <Form.Label className={cx("label-text")}>Username</Form.Label>
            <Form.Control
              className={cx("input-text")}
              required
              type="text"
              placeholder="Username"
              id="username"
              name="username"
              onChange={(e) => {
                console.log(e.target.value);
                setUser({ ...user, username: e.target.value });
              }}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid username.
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <div className={cx("row-input")}>
          <Form.Group controlId="validationCustom03">
            <Form.Label className={cx("label-text")}>Password</Form.Label>
            <Form.Control
              className={cx("input-text")}
              type="password"
              placeholder="Password"
              required
              id="password"
              name="password"
              onChange={(e) => {
                console.log(e.target.value);
                setUser({ ...user, password: e.target.value });
              }}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>
        </div>

        <button className={cx("btn")} onClick={submitForm}>
          Login
        </button>
      </Form>
      <div className={cx("login-footer")}>
        <a href="/signup" className={cx("footer-text")}>
          Create a account
        </a>
        <a className={cx("footer-text")} href="/home">
          Start for free
        </a>
      </div>
    </div>
  );
}

export default LoginUser;
