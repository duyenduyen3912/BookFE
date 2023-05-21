import classNames from "classnames/bind";
import styles from "./Signup.module.scss";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Navigate, useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function Admin() {
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [check, setCheck] = useState({});
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const addUser = () => {
    const form = document.getElementById("subform");
    if (form.checkValidity() === true) {
      if (user.password === check.checkPass) {
        fetch(string, {
          method: "post",
          mode: "cors",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          // .then((response) => console.log(response))
          .then((data) => {
            if (data.response === "success") {
              localStorage.setItem("isLogin", true);
              navigate(`/`);
            } else {
              alert("Adminname đã tồn tại!");
            }
          });
      } else {
        document.getElementById("confirm").style.display = "block";
      }
    }
  };

  let string = "http://localhost:8080/admin/addAdmin/" + user.adminname;

  return (
    <div>
      <div className={cx("title")}>SIGN UP AS ADMIN</div>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        id="subform"
      >
        <div className={cx("row-input")}>
          <Form.Group controlId="validationCustom01">
            <Form.Label className={cx("label-text")}>Admin name</Form.Label>
            <Form.Control
              className={cx("input-text")}
              required
              type="text"
              placeholder="Adminname"
              id="adminname"
              name="adminname"
              onChange={(e) => {
                console.log(e.target.value);
                setUser({ ...user, adminname: e.target.value });
              }}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid adminname.
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <div className={cx("row-input")}>
          <Form.Group controlId="validationCustom01">
            <Form.Label className={cx("label-text")}>Full name</Form.Label>
            <Form.Control
              className={cx("input-text")}
              required
              type="text"
              placeholder="Fullname"
              id="fullname"
              name="fullname"
              onChange={(e) => {
                console.log(e.target.value);
                setUser({ ...user, fullname: e.target.value });
              }}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid fullname.
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <div className={cx("row-input")}>
          <Form.Group controlId="validationCustom01">
            <Form.Label className={cx("label-text")}>DOB</Form.Label>
            <Form.Control
              className={cx("input-text")}
              required
              type="date"
              placeholder="DOB"
              id="date"
              name="date"
              onChange={(e) => {
                console.log(e.target.value);
                setUser({ ...user, date: e.target.value });
              }}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid dob.
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <div className={cx("row-input")}>
          <Form.Group controlId="validationCustom01">
            <Form.Label className={cx("label-text")}>Email</Form.Label>
            <Form.Control
              className={cx("input-text")}
              required
              type="text"
              placeholder="Email"
              id="email"
              name="email"
              onChange={(e) => {
                console.log(e.target.value);
                setUser({ ...user, email: e.target.value });
              }}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
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
              id="password"
              name="password"
              required
              onChange={(e) => {
                console.log(e.target.value);
                setUser({ ...user, password: e.target.value });
              }}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="validationCustom03">
            <Form.Label className={cx("label-text")}>
              Confirm Password
            </Form.Label>
            <Form.Control
              className={cx("input-text")}
              type="password"
              placeholder="Password"
              required
              onChange={(e) => {
                console.log(e.target.value);
                setCheck({ ...check, checkPass: e.target.value });
              }}
            />
            <Form.Control.Feedback type="invalid" id="confirm">
              Error password.
            </Form.Control.Feedback>
          </Form.Group>
        </div>

        <button className={cx("btn")} onClick={addUser}>
          Signup
        </button>
      </Form>
      <div className={cx("login-footer")}>
        <a href="/Login" className={cx("footer-text")}>
          Login
        </a>
        <a href="/" className={cx("footer-text")}>
          Start for free
        </a>
      </div>
    </div>
  );
}

export default Admin;
