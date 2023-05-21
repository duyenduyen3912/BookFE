import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { useState, useEffect } from "react";
import LoginAdmin from "./LoginAdmin";
import LoginUser from "./LoginUser";
import Loader from "../../component/Loader";

const cx = classNames.bind(styles);

function Login() {
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  document.title = "Login";
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1700);
  }, []);
  return (
    <>
      {" "}
      {loading ? (
        <Loader />
      ) : (
        <div className={cx("wrapper")}>
          <div className={cx("login")}>
            <div className={cx("btn-wrap")}>
              <button
                onClick={() => {
                  setLogin(true);
                }}
                className={cx("signup-button")}
              >
                Login as Admin
              </button>
              <button
                onClick={() => {
                  setLogin(false);
                }}
                className={cx("signup-button")}
              >
                Login up as User
              </button>
            </div>
            {login && <LoginAdmin />}
            {!login && <LoginUser />}
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
