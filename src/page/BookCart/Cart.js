import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../component/Header";
import {
  faTrash,
  faCartShopping,
  faDongSign,
} from "@fortawesome/free-solid-svg-icons";
import Loader from "../../component/Loader";
import { useState, useEffect, memo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Image } from "cloudinary-react";
import Form from "react-bootstrap/Form";
import Login from "../Login";
import { useMemo } from "react";
import { useCallback } from "react";
import { setData } from "../../data/action";
const cx = classNames.bind(styles);

function Cart() {
  document.title = "Cart";
  const idUser = localStorage.getItem("idUser");
  const username = localStorage.getItem("username");
  // const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    idUser: localStorage.getItem("idUser"),
  });

  const [book, setBook] = useState([]);
  const [total, setTotal] = useState(0);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const Order = (event) => {
    event.preventDefault();
    setValidated(true);
    const form = document.getElementById("submitForm");
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else if (form.checkValidity() === true) {
      fetch("http://localhost:8080/order", {
        method: "post",
        mode: "cors",
        body: JSON.stringify(
          book.map(({ idOrder, amount, total, idCart }) => ({
            idOrder: getIdOrder(),
            amount,
            total,
            idCart,
          }))
        ),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())

        .then((data) => {
          if (data.response === "successUpdateOrder") {
            alert("Order Success");
            navigate(`/book-order`);
          } else {
            alert("Something went wrong, let try again!");
          }
        });
      fetch("http://localhost:8080/orderInfor", {
        method: "post",
        mode: "cors",
        body: JSON.stringify({
          idUser: user.idUser,
          fullname: user.fullname,
          address: user.address,
          phone: user.phone,
          totalPrice: document.getElementById("total").textContent,
          idOrder: getIdOrder(),
        }),
        headers: {
          "Content-type": "application/json",
        },
      }).then((res) => res.json());
    }
  };
  const getIdOrder = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const date = currentDate.getDate();
    const hour = currentDate.getHours();
    const minute = currentDate.getMinutes();
    const second = currentDate.getSeconds();

    return `${year}${month + 1}${date}${hour}${minute}${second}`;
  };
  const redirectBook = (idBook) => {
    navigate(`/book-detail/${idBook}`);
  };
  const DeleteItem = (idCart) => {
    fetch(`http://localhost:8080/cart/delete/${idCart}`).then(() => {
      window.location.reload();
    });
  };
  const updateTotal = () => {
    const newTotal = book.reduce((total, item) => total + item.total, 0);
    setTotal(newTotal);
  };

  const updatePrice = (index, newTotal) => {
    const newBooks = [...book];
    newBooks[index].total = newTotal;
    setBook(newBooks);
    updateTotal();
  };
  const TotalItem = (price, amount) => {
    return price * amount;
  };

  useEffect(() => {
    fetch(`http://localhost:8080/user/${username}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((err) => console.log(err));

    fetch(`http://localhost:8080/cart/${idUser}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length != 0) {
          setBook(data);
          localStorage.setItem("cart", true);
        }
        // setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    updateTotal();
  }, [total === 0]);

  console.log(book);

  const _handleCartChange = (e, index) => {
    if (e.target.value < 1) {
      alert("You have to order at least a book");
    } else {
      // TotalItem(item.price, e.target.value);
      updatePrice(index, e.target.value * book[index].price);
      setBook([
        ...book.slice(0, index),
        {
          ...book[index],
          amount: e.target.value,
          total: TotalItem(book[index].price, e.target.value),
        },
        ...book.slice(index + 1, book.length),
      ]);
    }
  };

  const _renderBookItem = (item, index) => {
    return (
      <div className={cx("cart-item")}>
        <div className={cx("cart-img-wrap")}>
          {" "}
          <Image
            cloudName="dfcx62uhi"
            publicId={item.image}
            className={cx("cart-img")}
          />
        </div>
        <div className={cx("cart-detail-wrap")}>
          <div className={cx("cart-name-wrap")}>
            <div
              className={cx("cart-name-title")}
              onClick={() => redirectBook(item.idBook)}
            >
              {item.name}
            </div>
            <div className={cx("cart-name-price")}>{item.price}</div>
          </div>
          <div className={cx("cart-orderNumber")}>
            <input
              type="number"
              name="amount"
              id="amount"
              className={cx("cart-orderNumber-input")}
              defaultValue={item.amount}
              onChange={(e) => _handleCartChange(e, index)}
            />
          </div>
          <div className={cx("cart-orderTotal-wrap")}>
            <div className={cx("cart-total-price")}>
              {TotalItem(book[index].price, book[index].amount)}
            </div>
            <FontAwesomeIcon
              icon={faTrash}
              className={cx("cart-delete")}
              onClick={() => DeleteItem(item.idCart)}
            />
          </div>
        </div>{" "}
      </div>
    );
  };

  return (
    <>
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
              You have{" "}
              <span className={cx("cart-total-amount")}>{book.length}</span>{" "}
              item in your cart
            </p>
            <div className={cx("cart-list")}>
              {localStorage.getItem("isLoginUser") ? (
                <>{book?.length === 0 ? <></> : book?.map(_renderBookItem)}</>
              ) : (
                <Login />
              )}

              <div className={cx("cart-total")}>
                Total amount:
                <span className={cx("cart-total-amount-price")} id="total">
                  {total}
                </span>
                <FontAwesomeIcon
                  className={cx("cart-total-amount-icon")}
                  icon={faDongSign}
                />
              </div>
            </div>
            <div className={cx("cart-infor")}>
              <div className={cx("cart-infor-title")}>Write your infor</div>
              <Form
                noValidate
                validated={validated}
                onSubmit={Order}
                id="submitForm"
              >
                <Form.Group
                  controlId="validationCustom01"
                  className={cx("cart-infor-item")}
                >
                  <Form.Control
                    placeholder="Full name"
                    className={cx("cart-infor-input")}
                    required
                    type="text"
                    defaultValue={user.fullname}
                    id="fullname"
                    name="fullname"
                    onChange={(e) => {
                      setUser({ ...user, fullname: e.target.value });
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Full name.
                  </Form.Control.Feedback>

                  <Form.Control
                    placeholder="Address"
                    className={cx("cart-infor-input")}
                    required
                    type="text"
                    defaultValue={user.address}
                    id="address"
                    name="address"
                    onChange={(e) => {
                      setUser({ ...user, address: e.target.value });
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Address.
                  </Form.Control.Feedback>

                  <Form.Control
                    placeholder="Phone"
                    className={cx("cart-infor-input")}
                    required
                    type="text"
                    defaultValue={user.phone}
                    id="phone"
                    name="phone"
                    onChange={(e) => {
                      console.log("ok");
                      setUser({ ...user, phone: e.target.value });
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Phone.
                  </Form.Control.Feedback>
                </Form.Group>
              </Form>
            </div>
            <div className={cx("cart-btn-wrap")}>
              <button className={cx("cart-btn")} onClick={Order}>
                {" "}
                Order{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(Cart);
