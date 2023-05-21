import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

const cx = classNames.bind(styles);
function LoginAdmin() {
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

  let string = "http://localhost:8080/admin/" + user.adminname;
  console.log(string);
  return (
    <div>
      <div className={cx("title")}>LOGIN AS ADMIN</div>
      <Form
        className="form-Detail"
        noValidate
        validated={validated}
        id="submitForm"
      >
        <div className={cx("row-input")}>
          <Form.Group controlId="validationCustom01">
            <Form.Label className={cx("label-text")}>Adminname</Form.Label>
            <Form.Control
              className={cx("input-text")}
              required
              type="text"
              placeholder="Adminname"
              id="adminname"
              name="adminname"
              onChange={(e) => {
                setUser({ ...user, adminname: e.target.value });
              }}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid adminname.
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
        <a className={cx("footer-text")} href="/">
          Start for free
        </a>
      </div>
    </div>
  );
}

export default LoginAdmin;
