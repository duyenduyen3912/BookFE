import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookTanakh,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const cx = classNames.bind(styles);

function Header() {
  const navigate = useNavigate();
  const username = useParams();

  const [key, setKey] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [result, setResult] = useState([]);
  const logout = () => {
    localStorage.removeItem("isLoginUser");
    localStorage.removeItem("img");
    localStorage.removeItem("username");
    localStorage.removeItem("idUser");
    navigate(`/login`);
  };
  const login = () => {
    navigate(`/login`);
  };

  const viewUser = () => {
    navigate(`/user-infor/${localStorage.getItem("username")}`);
  };

  const search = () => {
    if (searchBy === "name") {
      fetch("http://localhost:8080/bookName/" + `${key}`)
        .then((response) => response.json())

        .then((data) => setResult(data))

        .catch((err) => console.log(err));
    } else if (searchBy === "author") {
      fetch("http://localhost:8080/bookAuthor/" + `${key}`)
        .then((response) => response.json())

        .then((data) => setResult(data))

        .catch((err) => console.log(err));
    }
  };
  console.log(result);
  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("header-home")}>
          <FontAwesomeIcon
            icon={faBookTanakh}
            className={cx("header-home-icon")}
          />
          <span className={cx("header-home-name")}>Book</span>
        </div>
        <div className={cx("header-search")}>
          <input
            type="text"
            placeholder="Search here..."
            className={cx("header-search-input")}
            onChange={(e) => {
              setKey(e.target.value);
            }}
          />
          <select
            className={cx("option-wrap")}
            onChange={(e) => {
              setSearchBy(e.target.value);
              console.log(searchBy);
            }}
          >
            <option value="name" className={cx("option-item")}>
              Book Name
            </option>
            <option value="author" className={cx("option-item")}>
              Author
            </option>
          </select>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={cx("header-search-icon")}
            onClick={search}
          />
        </div>
        <div className={cx("header-user")}>
          <span
            className={cx("header-user-username")}
            onClick={localStorage.getItem("username") ? viewUser : login}
          >
            Hi,
            {localStorage.getItem("username")
              ? localStorage.getItem("username")
              : "Login"}
          </span>
          <div className={cx("header-user-menu")}>
            {localStorage.getItem("isLoginUser") ? (
              <>
                <li className={cx("header-user-menu-item")}>Cart</li>
                <li className={cx("header-user-menu-item")}>Order</li>
                <li className={cx("header-user-menu-item")} onClick={logout}>
                  Logout
                </li>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
