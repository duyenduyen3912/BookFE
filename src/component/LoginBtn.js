import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);
function Login() {
  const navigate = useNavigate();
  const LoginClick = () => {
    navigate(`/Login`);
  };
  return (
    <>
      <button className={cx("btn-custom")} onClick={LoginClick}>
        Login
      </button>
    </>
  );
}

export default Login;
