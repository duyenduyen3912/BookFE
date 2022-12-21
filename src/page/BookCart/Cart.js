import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../component/Header";
import { faTrash, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../component/Loader";
import { useState, useEffect } from "react";
const cx = classNames.bind(styles);

function Cart() {
  document.title = "Cart";
  const [loading, setLoading] = useState(true);
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
          <div className={cx("container")}>
            <div className={cx("cart")}>
              <div className={cx("cart-title")}>
                <FontAwesomeIcon
                  className={cx("cart-icon")}
                  icon={faCartShopping}
                />
                Book cart
              </div>
              <p className={cx("cart-amount")}>
                You have <span className={cx("cart-total-amount")}>3</span> item
                in your cart
              </p>
              <div className={cx("cart-list")}>
                <div className={cx("cart-item")}>
                  <div className={cx("cart-img-wrap")}>
                    {" "}
                    <img
                      src={require("../../image/conan.jpg")}
                      className={cx("cart-img")}
                    />
                  </div>
                  <div className={cx("cart-detail-wrap")}>
                    <div className={cx("cart-name-wrap")}>
                      <div className={cx("cart-name-title")}>Doraemon</div>
                      <div className={cx("cart-name-price")}>16000 VND</div>
                    </div>
                    <div className={cx("cart-orderNumber")}>
                      <input
                        type="number"
                        className={cx("cart-orderNumber-input")}
                      />
                    </div>
                    <div className={cx("cart-total-price")}>16000 VND</div>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className={cx("cart-delete")}
                    />
                  </div>{" "}
                </div>
                <div className={cx("cart-item")}>
                  <div className={cx("cart-img-wrap")}>
                    {" "}
                    <img
                      src={require("../../image/conan.jpg")}
                      className={cx("cart-img")}
                    />
                  </div>
                  <div className={cx("cart-detail-wrap")}>
                    <div className={cx("cart-name-wrap")}>
                      <div className={cx("cart-name-title")}>Doraemon</div>
                      <div className={cx("cart-name-price")}>16000 VND</div>
                    </div>
                    <div className={cx("cart-orderNumber")}>
                      <input
                        type="number"
                        className={cx("cart-orderNumber-input")}
                      />
                    </div>
                    <div className={cx("cart-total-price")}>16000 VND</div>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className={cx("cart-delete")}
                    />
                  </div>{" "}
                </div>
                <div className={cx("cart-item")}>
                  <div className={cx("cart-img-wrap")}>
                    {" "}
                    <img
                      src={require("../../image/conan.jpg")}
                      className={cx("cart-img")}
                    />
                  </div>
                  <div className={cx("cart-detail-wrap")}>
                    <div className={cx("cart-name-wrap")}>
                      <div className={cx("cart-name-title")}>Doraemon</div>
                      <div className={cx("cart-name-price")}>16000 VND</div>
                    </div>
                    <div className={cx("cart-orderNumber")}>
                      <input
                        type="number"
                        className={cx("cart-orderNumber-input")}
                      />
                    </div>
                    <div className={cx("cart-total-price")}>16000 VND</div>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className={cx("cart-delete")}
                    />
                  </div>{" "}
                </div>
                <div className={cx("cart-total")}>
                  Total amount:
                  <span className={cx("cart-total-amount-price")}>
                    100000VND
                  </span>
                </div>
              </div>
              <div className={cx("cart-infor")}>
                <div className={cx("cart-infor-title")}>Write your infor</div>
                <div className={cx("cart-infor-item")}>
                  <input
                    type="text"
                    className={cx("cart-infor-input")}
                    placeholder="Fullname"
                  />
                  <input
                    type="text"
                    className={cx("cart-infor-input")}
                    placeholder="Address"
                  />
                  <input
                    type="text"
                    className={cx("cart-infor-input")}
                    placeholder="Phone"
                  />
                </div>
              </div>
              <div className={cx("cart-btn-wrap")}>
                <button className={cx("cart-btn")}> Order </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
