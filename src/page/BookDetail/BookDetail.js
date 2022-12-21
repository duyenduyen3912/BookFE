import classNames from "classnames/bind";
import Header from "../../component/Header";
import styles from "./BookDetail.module.scss";
import {
  faPlus,
  faPaperPlane,
  faDongSign,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Image } from "cloudinary-react";
import Loader from "../../component/Loader";
import Noti from "../../component/Noti/index";

const cx = classNames.bind(styles);

function BookDetail() {
  const params = useParams();
  const idBook = params.id;
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState({});
  const [noti, setNoti] = useState({
    noti: "",
    state: false,
  });
  const [cmt, setCmt] = useState({
    idBook: idBook,
    idUser: localStorage.getItem("idUser"),
  });
  const [listCmt, setListCmt] = useState([]);
  document.title = book.name;
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
  const addComt = () => {
    fetch("http://localhost:8080/book/addComment", {
      method: "post",
      mode: "cors",
      body: JSON.stringify(cmt),
      headers: {
        "Content-type": "application/json",
      },
    });

    window.location.reload();
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1700);
  }, []);
  console.log(noti);
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

                <div className={cx("book-order-number")}>
                  <span className={cx("book-order-numbe-text")}>Number</span>
                  <input
                    type="number"
                    min="1"
                    id="number"
                    className={cx("book-order-numbe-input")}
                    onChange={(e) => {
                      if (e.target.value < 0) {
                        setNoti({
                          noti: "You must order at least 1 book",
                          state: true,
                        });
                        setTimeout(() => {
                          document.getElementById("number").value = "";
                        }, 500);
                      } else {
                        setNoti({
                          noti: "You must order at least 1 book",
                          state: false,
                        });
                      }
                    }}
                  />
                </div>
                <button className={cx("book-order-btn")}>
                  <FontAwesomeIcon
                    icon={faPlus}
                    className={cx("book-order-icon")}
                  />
                  Add to your cart
                </button>
              </div>
            </div>
            <div className={cx("comment")}>
              <div className={cx("comment-text")}>Comments</div>
              {listCmt.map((item) => (
                <div className={cx("comment-wrap")}>
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
                    <div className={cx("comment-content")}>{item.comment}</div>
                  </div>
                </div>
              ))}

              <div className={cx("write-comment")}>
                <div className={cx("write-comment-text")}>
                  Write your review here
                </div>
                <div className={cx("write-comment-rate")}>
                  <span className={cx("write-comment-rate-text")}>Rate:</span>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    id="rate"
                    onChange={(e) => {
                      setCmt({ ...cmt, rate: e.target.value });
                      if (e.target.value < 0 || e.target.value > 5) {
                        setNoti({
                          noti: "Please rate from 0 to 5",
                          state: true,
                        });
                        setTimeout(() => {
                          document.getElementById("rate").value = "";
                        }, 500);
                      } else {
                        setNoti({
                          noti: "",
                          state: false,
                        });
                      }
                    }}
                    className={cx("write-comment-rate-input")}
                  />
                </div>
                <div className={cx("write-comment-content")}>
                  <span className={cx("write-comment-rate-text")}>
                    Comment:
                  </span>
                  <textarea
                    type="text"
                    className={cx("write-comment-content-input")}
                    placeholder="Type something..."
                    onChange={(e) => {
                      setCmt({ ...cmt, comment: e.target.value });
                    }}
                  />
                </div>
                <button
                  className={cx("write-comment-submit")}
                  onClick={addComt}
                >
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    className={cx("write-comment-icon")}
                  />
                  Send
                </button>
              </div>
            </div>
          </div>
          <Noti noti={noti.noti} state={noti.state} />;
        </div>
      )}
    </>
  );
}

export default BookDetail;
