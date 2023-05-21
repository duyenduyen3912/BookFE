import classNames from "classnames/bind";
import styles from "./Modal.module.scss";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

const cx = classNames.bind(styles);
function ModalDelete({ idOrder }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = (idBook) => {
    fetch(`http://localhost:8080/order/delete-order/${idOrder}`).then(
      (response) => console.log(response)
    );
    fetch(`http://localhost:8080/order/delete-infor/${idOrder}`).then(
      (response) => console.log(response)
    );
    setShow(false);
    window.location.reload();
  };
  return (
    <>
      <button className={cx("order-btn")} onClick={handleShow}>
        Cancel order
      </button>

      <Modal show={show} onHide={handleClose} className={cx("modal")}>
        <div className={cx("modal-wrapper")}>
          <Modal.Header closeButton className={cx("modal-header")}>
            <Modal.Title className={cx("modal-body")}>
              Delete Confirm{" "}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={cx("modal-body")}>
            Do you wannt to cancel order {idOrder} ?
          </Modal.Body>
          <Modal.Footer className={cx("modal-btn")}>
            <button
              variant="secondary"
              onClick={handleClose}
              className={cx("btn-custom")}
            >
              Close
            </button>
            <button
              variant="primary"
              onClick={() => handleDelete(idOrder)}
              className={cx("btn-custom")}
            >
              Delete
            </button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default ModalDelete;
