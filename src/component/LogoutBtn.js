import classNames from "classnames/bind";
import styles from "./Button.module.scss";
import { Navigate, useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);
function Logout() {
  const navigate = useNavigate();
  const LogoutClick = () => {
    localStorage.removeItem("isLogin");
    navigate(`/`);
  };
  return (
    <>
      <button className={cx("btn-custom")} onClick={LogoutClick}>
        Logout
      </button>
    </>
  );
}

export default Logout;
