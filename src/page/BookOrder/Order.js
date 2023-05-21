import classNames from "classnames/bind";
import Header from "../../component/Header";
import styles from "./Order.module.scss";
import { useEffect, useState, memo } from "react";
import Loader from "../../component/Loader";
import { Image } from "cloudinary-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCartShopping,
  faDongSign,
} from "@fortawesome/free-solid-svg-icons";
import ModalDelete from "../../component/Modal";

const cx = classNames.bind(styles);

function Order() {
  document.title = "Order";
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState([]);
  const idUser = localStorage.getItem("idUser");
  const orders = [];
  useEffect(() => {
    products.map((product) => {
      // Tìm đơn hàng hiện tại
      let currentOrder = orders.find(
        (order) => order.idOrder === product.idOrder
      );

      // Nếu không tìm thấy đơn hàng hiện tại, tạo một đơn hàng mới
      if (!currentOrder) {
        currentOrder = {
          idOrder: product.idOrder,
          image: product.image,
          price: product.price,
          name: product.name,
          amount: product.amount,
          total: product.total,
          products: [],
        };
        orders.push(currentOrder);
      }

      // Thêm sản phẩm vào đơn hàng hiện tại và cập nhật tổng giá trị đơn hàng
      currentOrder.products.push(product);
      currentOrder.totalPrice = product.totalPrice;
      currentOrder.fullname = product.fullname;
      currentOrder.address = product.address;
      currentOrder.phone = product.phone;
      setOrder(orders);
    });
  }, [products]);
  useEffect(() => {
    fetch(`http://localhost:8080/order/${idUser}`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })

      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1700);
  }, []);
  console.log(order);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={cx("wrapper")}>
          <Header />
          <div className={cx("container")}>
            <div className={cx("order-title")}>Your order</div>
            {order.map((item, index) => {
              return (
                <div className={cx("order-wrap")}>
                  <div className={cx("order-user-infor")}>
                    <div className={cx("order-user-infor-item")}>
                      <span className={cx("order-user-infor-left")}>
                        Username:{" "}
                      </span>
                      <span className={cx("order-user-infor-right")}>
                        {localStorage.getItem("username")}
                      </span>
                    </div>
                    <div className={cx("order-user-infor-item")}>
                      <span className={cx("order-user-infor-left")}>
                        Fullname:
                      </span>
                      <span className={cx("order-user-infor-right")}>
                        {item.fullname}
                      </span>
                    </div>
                    <div className={cx("order-user-infor-item")}>
                      <span className={cx("order-user-infor-left")}>
                        Address:
                      </span>
                      <span className={cx("order-user-infor-right")}>
                        {item.address}
                      </span>
                    </div>
                    <div className={cx("order-user-infor-item")}>
                      <span className={cx("order-user-infor-left")}>
                        Phone:
                      </span>
                      <span className={cx("order-user-infor-right")}>
                        {item.phone}
                      </span>
                    </div>
                  </div>

                  <div className={cx("order-item-title")}>Your item order</div>
                  {item.products.map((product) => {
                    return (
                      <div className={cx("order-item-wrap")}>
                        <div className={cx("order-item")}>
                          <div className={cx("order-item-img-wrap")}>
                            <Image
                              cloudName="dfcx62uhi"
                              publicId={product.image}
                              className={cx("order-item-img")}
                            />
                          </div>
                          <div className={cx("order-item-detail")}>
                            <div className={cx("order-item-name")}>
                              {product.name}
                            </div>
                            <div className={cx("order-item-price")}>
                              {product.price}
                            </div>
                            <div className={cx("order-item-amount")}>
                              x{" "}
                              <span className={cx("order-item-amount-number")}>
                                {product.amount}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className={cx("order-item-total")}>
                          <span className={cx("order-item-total-amount")}>
                            {product.total}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  <div className={cx("order-item-total")}>
                    Total:
                    <span className={cx("order-item-total-amount")}>
                      {item.totalPrice}
                    </span>
                    <FontAwesomeIcon
                      icon={faDongSign}
                      className={cx("order-total-icon")}
                    />
                  </div>
                  <div className={cx("order-btn-wrap")}>
                    <ModalDelete idOrder={item.idOrder} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default memo(Order);
