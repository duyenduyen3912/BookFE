import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import styles from "./Signup.module.scss";
import Admin from "./SignupAdmin";
import User from "./SignupUser";
import Loader from "../../component/Loader";
const cx = classNames.bind(styles);

function Signup() {
  const [signup, setSignUp] = useState(false);
  const [loading, setLoading] = useState(true);
  document.title = "Sign up";
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1700);
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={cx("wrapper")}>
          <div className={cx("login")}>
            <div className={cx("btn-wrap")}>
              <button
                onClick={() => {
                  setSignUp(true);
                }}
                className={cx("signup-button")}
              >
                Sign up as Admin
              </button>
              <button
                onClick={() => {
                  setSignUp(false);
                }}
                className={cx("signup-button")}
              >
                Sign up as User
              </button>
            </div>
            {signup && <Admin />}
            {!signup && <User />}
          </div>
        </div>
      )}
    </>
  );
}

export default Signup;
