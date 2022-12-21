import classNames from "classnames/bind";
import Header from "../../component/Header";
import styles from "./Order.module.scss";
import { useEffect, useState } from "react";
import Loader from "../../component/Loader";
import OrderDetail from "../../component/OrderDetail";

const cx = classNames.bind(styles);

function Order() {
  document.title = "Order";
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
            <div className={cx("order-title")}>Your order</div>

            <div className={cx("order-wrap")}>
              <div className={cx("order-user-infor")}>
                <div className={cx("order-user-infor-item")}>
                  <span className={cx("order-user-infor-left")}>Username:</span>
                  <span className={cx("order-user-infor-right")}>
                    DuyenDuyen
                  </span>
                </div>
                <div className={cx("order-user-infor-item")}>
                  <span className={cx("order-user-infor-left")}>Fullname:</span>
                  <span className={cx("order-user-infor-right")}>
                    Ngô Thị Duyên
                  </span>
                </div>
                <div className={cx("order-user-infor-item")}>
                  <span className={cx("order-user-infor-left")}>Address:</span>
                  <span className={cx("order-user-infor-right")}>
                    Số nhà 20, ngõ 3, Thượng Phúc, Bắc Hồng, Đông Anh, Hà nội
                  </span>
                </div>
                <div className={cx("order-user-infor-item")}>
                  <span className={cx("order-user-infor-left")}>Phone:</span>
                  <span className={cx("order-user-infor-right")}>
                    0312369874
                  </span>
                </div>
              </div>

              <div className={cx("order-item-title")}>Your item order</div>
              <OrderDetail />
              <OrderDetail />
              <OrderDetail />
              <div className={cx("order-btn-wrap")}>
                <button className={cx("order-btn")}>Cancel order</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Order;
