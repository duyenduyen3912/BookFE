import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

const cx = classNames.bind(styles);
function Login() {
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState({});
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  console.log(validated);
  const submitForm = () => {
    if (validated === true) {
      console.log("click");
      fetch(string, {
        method: "POST",
        mode: "cors",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.response === user.password) {
            localStorage.setItem("isLogin", true);
            navigate(`/`);
          } else {
            alert("Sai tài khoản hoặc mật khẩu");
          }
        });
    }
  };

  let string = "http://localhost:8080/user/" + user.username;
  return (
    <div className={cx("wrapper")}>
      <div className={cx("login")}>
        <div className={cx("title")}>LOGIN</div>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
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

          <button className={cx("btn")} onClick={submitForm} type="submit">
            Login
          </button>
        </Form>
        <div className={cx("login-footer")}>
          <a href="/signup" className={cx("footer-text")}>
            Create a account
          </a>
          <a className={cx("footer-text")} href="/">
            Start for free
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
