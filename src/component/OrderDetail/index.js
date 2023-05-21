import classNames from "classnames/bind";
import styles from "./OrderDetail.module.scss";

const cx = classNames.bind(styles);

function OrderDetail() {
  return (
    <>
      <div className={cx("order-item-wrap")}>
        <div className={cx("order-item")}>
          <div className={cx("order-item-img-wrap")}>
            <img
              className={cx("order-item-img")}
              src={require("../../image/Doraemon1.jpg")}
            />
          </div>
          <div className={cx("order-item-detail")}>
            <div className={cx("order-item-name")}>Doraemon</div>
            <div className={cx("order-item-price")}>16000 VND</div>
            <div className={cx("order-item-amount")}>
              x <span className={cx("order-item-amount-number")}>1</span>
            </div>
          </div>
        </div>
        <div className={cx("order-item-total")}>
          <span className={cx("order-item-total-amount")}>16000 VND</span>
        </div>
      </div>
    </>
  );
}

export default OrderDetail;
