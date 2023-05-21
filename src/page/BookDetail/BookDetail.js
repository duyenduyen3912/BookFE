import classNames from "classnames/bind";
import Header from "../../component/Header";
import styles from "./BookDetail.module.scss";
import {
  faPlus,
  faPaperPlane,
  faDongSign,
  faStar,
  faSquareXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Image } from "cloudinary-react";
import Loader from "../../component/Loader";
import Noti from "../../component/Noti/index";
import Comment from "../../component/Comment";

const cx = classNames.bind(styles);

function BookDetail() {
  const params = useParams();
  const idBook = params.id;

  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState({});
  const [cart, setCart] = useState({
    idBook: idBook,
    idUser: localStorage.getItem("idUser"),
    amount: 1,
  });
  document.title = book.name;
  const [noti, setNoti] = useState({
    noti: "",
    state: false,
  });
  const [listCmt, setListCmt] = useState([]);
  const checkUsername = (username) => {
    if (username === localStorage.getItem("username")) {
      return true;
    } else return false;
  };
  const deleteCmt = (idCmt) => {
    fetch("http://localhost:8080/book/comment/delete/" + `${idCmt}`).then(
      window.location.reload()
    );
  };
  const AddCart = () => {
    fetch("http://localhost:8080/Addcart", {
      method: "post",
      mode: "cors",
      body: JSON.stringify(cart),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())

      .then((data) => {
        if (data.response === "successUpdate")
          alert("Successfully added to your cart");
        else {
          alert("Something went wrong, please try again!");
        }
      });
  };
  useEffect(() => {
    fetch(`http://localhost:8080/book/${idBook}`)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((err) => console.log(err));

    fetch(`http://localhost:8080/book/comment/${idBook}`)
      .then((response) => response.json())
      .then((data) => setListCmt(data))
      .catch((err) => console.log(err));
  }, []);

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
          <Header />
          <div className={cx("container-book")}>
            <div className={cx("book")}>
              <div className={cx("book-img")}>
                <Image
                  cloudName="dfcx62uhi"
                  publicId={book.image}
                  width="100%"
                  className={cx("image-book")}
                />
              </div>
              <div className={cx("book-order")}>
                <div className={cx("book-order-name")}>{book.name} </div>
                <div className={cx("book-order-author")}>{book.author} </div>
                <div className={cx("book-order-price")}>
                  {book.price}
                  <FontAwesomeIcon
                    className={cx("book-order-price-icon")}
                    icon={faDongSign}
                  />
                </div>
                <div className={cx("book-detail-text")}>Description</div>
                <div className={cx("book-detail")} id="detail">
                  <div className={cx("detail")}>
                    <div className={cx("book-detail-item")}>
                      <span className={cx("book-detail-name")}>Author:</span>
                      <span className={cx("book-detail-item-data")}>
                        {book.author}
                      </span>
                    </div>
                    <div className={cx("book-detail-item")}>
                      <span className={cx("book-detail-name")}>Category:</span>
                      <span className={cx("book-detail-item-data")}>
                        {book.category}
                      </span>
                    </div>
                    <div className={cx("book-detail-item")}>
                      <span className={cx("book-detail-name")}>
                        Date release:
                      </span>
                      <span className={cx("book-detail-item-data")}>
                        {book.date}
                      </span>
                    </div>
                    <div className={cx("book-detail-item")}>
                      <span className={cx("book-detail-name")}>
                        Page number:
                      </span>
                      <span className={cx("book-detail-item-data")}>
                        {book.pagenumber}
                      </span>
                    </div>
                  </div>
                  <div className={cx("book-detail-des")}>
                    <div>Detail:</div>
                    <div>{book.detail}</div>
                  </div>
                </div>
                {localStorage.getItem("isLoginUser") ? (
                  <>
                    <div className={cx("book-order-number")}>
                      <span className={cx("book-order-numbe-text")}>
                        Number
                      </span>
                      <input
                        type="number"
                        min="1"
                        id="number"
                        className={cx("book-order-numbe-input")}
                        defaultValue="1"
                        onChange={(e) => {
                          if (e.target.value < 1) {
                            setNoti({
                              noti: "You must order at least a book",
                              state: true,
                            });
                            setTimeout(() => {
                              document.getElementById("number").value = "";
                            }, 500);
                          } else {
                            setCart({ ...cart, amount: e.target.value });
                            setNoti({
                              noti: "You must order at least a book",
                              state: false,
                            });
                          }
                        }}
                      />
                    </div>
                    <button className={cx("book-order-btn")} onClick={AddCart}>
                      <FontAwesomeIcon
                        icon={faPlus}
                        className={cx("book-order-icon")}
                      />
                      Add to your cart
                    </button>
                  </>
                ) : null}
              </div>
            </div>
            <div className={cx("comment")}>
              <div className={cx("comment-text")}>Comments</div>
              {listCmt.length > 0 ? (
                listCmt.map((item) => (
                  <div className={cx("comment-wrap")}>
                    <div className={cx("comment-content-wrap")}>
                      {" "}
                      <div className={cx("comment-img-wrap")}>
                        <Image
                          cloudName="dfcx62uhi"
                          publicId={item.img}
                          width="100%"
                          className={cx("comment-img")}
                        />
                      </div>
                      <div>
                        <div className={cx("comment-username")}>
                          {item.username}
                        </div>
                        <div className={cx("comment-rate")}>
                          <span>{item.rate}</span>
                          <span>/5</span>
                        </div>
                        <div className={cx("comment-content")}>
                          {item.comment}
                        </div>
                      </div>
                    </div>
                    {checkUsername(item.username) ? (
                      <FontAwesomeIcon
                        icon={faSquareXmark}
                        className={cx("comment-delete")}
                        onClick={() => deleteCmt(item.idComment)}
                      />
                    ) : null}
                  </div>
                ))
              ) : (
                <div className={cx("comment-empty")}>
                  {" "}
                  This book has not been rated yet
                </div>
              )}
              {localStorage.getItem("isLoginUser") ? (
                <Comment id={idBook} />
              ) : null}
            </div>
          </div>
          <Noti noti={noti.noti} state={noti.state} />;
        </div>
      )}
    </>
  );
}

export default BookDetail;
