import classNames from "classnames/bind";
import { Navigate, useNavigate } from "react-router-dom";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);
function Add() {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/book/${id}`);
  };
  return (
    <div>
      <button className={cx("btn-custom")} onClick={() => handleClick(-1)}>
        Add new book
      </button>
    </div>
  );
}

export default Add;
