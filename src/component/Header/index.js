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
import { setData } from "../../data/action";

const cx = classNames.bind(styles);

function Header() {
  const navigate = useNavigate();
  const username = useParams();
  const dispatch = useDispatch();
  const [key, setKey] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [result, setResult] = useState([]);

  const RedirectCart = () => {
    navigate(`/book-cart`);
  };
  const RedirectOrder = () => {
    navigate(`/book-order`);
  };
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

        .then((data) => {
          console.log(data);
          dispatch(setData(data));
        })

        .catch((err) => console.log(err))

        .then(() => navigate(`/search/${key}`));
    } else if (searchBy === "author") {
      fetch("http://localhost:8080/bookAuthor/" + `${key}`)
        .then((response) => response.json())

        .then((data) => {
          console.log(data);
          dispatch(setData(data));
        })

        .catch((err) => console.log(err))
        .then(() => navigate(`/search/${key}`));
    }
  };

  const home = () => {
    navigate(`/home`);
  };

  useEffect(() => {
    if (!localStorage.getItem("isLoginUser")) {
      document.getElementById("menu").style.visibility = "hidden";
    }
  }, []);
  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("header-home")}>
          <FontAwesomeIcon
            icon={faBookTanakh}
            className={cx("header-home-icon")}
          />
          <span className={cx("header-home-name")} onClick={home}>
            Book
          </span>
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
              Book
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
            onClick={localStorage.getItem("isLoginUser") ? viewUser : login}
          >
            {localStorage.getItem("username") ? (
              <span>Hi, {localStorage.getItem("username")}</span>
            ) : (
              "Login"
            )}
          </span>
          <div className={cx("header-user-menu")} id="menu">
            {localStorage.getItem("isLoginUser") ? (
              <>
                <li
                  className={cx("header-user-menu-item")}
                  onClick={RedirectCart}
                >
                  Cart
                </li>

                <li
                  className={cx("header-user-menu-item")}
                  onClick={RedirectOrder}
                >
                  Order
                </li>
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
