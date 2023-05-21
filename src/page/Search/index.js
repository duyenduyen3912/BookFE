import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { Row, Col } from "react-bootstrap";
import { Navigate, useNavigate, redirect, useParams } from "react-router-dom";
import { Image } from "cloudinary-react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../../component/Header";

const cx = classNames.bind(styles);
function Search() {
  const navigate = useNavigate();
  const param = useParams();
  const key = param.key;
  const data = useSelector((state) => state.data);
  console.log(typeof data);
  data.map((item) => {
    console.log(item.name);
  });
  const handleClick = (idBook) => {
    navigate(`/book-detail/${idBook}`);
  };
  return (
    <>
      <div className={cx("wrapper")}>
        <Header />
        {data.length > 0 ? (
          <>
            <div className={cx("title")}> Search result for: {key}</div>

            <div className={cx("list-book")}>
              <Row>
                {data.map((item) => {
                  return (
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

                          <div className={cx("list-book-item-name")}>
                            {item.name}
                          </div>
                          <div className={cx("list-book-item-author")}>
                            {item.author}
                          </div>
                        </div>
                      </a>
                    </div>
                  );
                })}
              </Row>
            </div>
          </>
        ) : (
          <div className={cx("title")}>No search result for: {key}</div>
        )}
      </div>
    </>
  );
}

export default Search;
