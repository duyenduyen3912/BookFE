import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import classNames from "classnames/bind";
import { Navigate, useNavigate, redirect } from "react-router-dom";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

function ActButton({ id }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = (id) => {
    navigate(`/book/${id}`);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/book/delete/${id}`).then((response) =>
      console.log(response)
    );
    setShow(false);
    window.location.reload();
  };

  return (
    <>
      <button className={cx("btn-custom")} onClick={() => handleClick(id)}>
        View
      </button>

      <button
        variant="primary"
        className={cx("btn-custom")}
        onClick={handleShow}
      >
        Delete
      </button>

      <Modal show={show} onHide={handleClose} className={cx("modal")}>
        <div className={cx("modal-wrapper")}>
          <Modal.Header closeButton className={cx("modal-header")}>
            <Modal.Title className={cx("modal-body")}>
              Delete Confirm{" "}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={cx("modal-body")}>
            Do you wannt to delete this book?
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
              onClick={() => handleDelete(id)}
              className={cx("btn-custom")}
            >
              Delete
            </button>
          </Modal.Footer>
        </div>
      </Modal>

      {/* <button className={cx("btn-custom")} onClick={handleShow}>
        Delete
      </button> */}
      {/* 
      <Modal show={show} onHide={handleClose}>
        <Modal.Body className={cx("modal")}>Bạn có muốn xóa không? </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              console.log(id);
              handleDelete(id);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
}

export default ActButton;
