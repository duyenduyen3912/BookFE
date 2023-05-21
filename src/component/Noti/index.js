import { useState, useEffect, useLayoutEffect } from "react";
import Modal from "react-bootstrap/Modal";
import classNames from "classnames/bind";
import { Navigate, useNavigate, redirect } from "react-router-dom";

import styles from "../Button.module.scss";

const cx = classNames.bind(styles);

function Noti(props) {
  const [show, setShow] = useState(props.state);

  console.log(props.state);
  console.log(show);
  const handleClose = () => {
    setShow(false);
    console.log(show);
  };

  useEffect(() => {
    if (props.state) {
      setShow(props.state);
    }
  }, [props.state]);
  return (
    <>
      {" "}
      <Modal show={show} onHide={handleClose} className={cx("modal")}>
        <div className={cx("modal-wrapper")}>
          <Modal.Header closeButton className={cx("modal-header")}>
            <Modal.Title className={cx("modal-body")}>Notification</Modal.Title>
          </Modal.Header>
          <Modal.Body className={cx("modal-body")}>{props.noti}</Modal.Body>
          <Modal.Footer className={cx("modal-btn")}>
            <button
              variant="secondary"
              onClick={handleClose}
              className={cx("btn-custom")}
            >
              Close
            </button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default Noti;
