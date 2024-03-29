import classNames from "classnames/bind";
import styles from "../../component/CategoryBook/Category.module.scss";
import { Row, Col } from "react-bootstrap";
import { Navigate, useNavigate, redirect } from "react-router-dom";
import { Image } from "cloudinary-react";
import { useState, useEffect } from "react";

const cx = classNames.bind(styles);
function Search() {
  useEffect(() => {
    fetch("http://localhost:8080/books/" + `${viewCategory}`)
      .then((response) => response.json())

      .then((data) => setBook(data))

      .catch((err) => console.log(err));
  }, [viewCategory]);
  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("title")}> Kết quả tìm kiếm cho: </div>
        <div className={cx("list-book")}>
          <div className={cx("list-book-col")}>
            <a
              className={cx("list-book-link")}
              onClick={() => handleClick(item.idBook)}
            >
              <div className={cx("list-book-item")}>
                <div className={cx("list-book-img-wrap")}>
                  <div className={cx("list-book-img-wrapper")}>
                    <Image
                      cloudName="dfcx62uhi"
                      publicId={item.image}
                      width="100%"
                      className={cx("list-book-img")}
                    />
                  </div>
                </div>

                <div className={cx("list-book-item-name")}>{item.name}</div>
                <div className={cx("list-book-item-author")}>{item.author}</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
