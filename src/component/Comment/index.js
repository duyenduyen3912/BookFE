import classNames from "classnames/bind";
import styles from "./Comment.module.scss";
import {
  faPlus,
  faPaperPlane,
  faDongSign,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef } from "react";
import Noti from "../Noti";

const cx = classNames.bind(styles);

function Comment(props) {
  const [cmt, setCmt] = useState({
    idBook: props.id,
    idUser: localStorage.getItem("idUser"),
  });
  const ref = useRef();
  const [noti, setNoti] = useState({
    noti: "",
    state: false,
  });
  const addComt = () => {
    const rate = ref.current;
    console.log(rate.value);
    if (rate.value > 0) {
      fetch("http://localhost:8080/book/addComment", {
        method: "post",
        mode: "cors",
        body: JSON.stringify(cmt),
        headers: {
          "Content-type": "application/json",
        },
      });
      window.location.reload();
    } else {
      setNoti({
        noti: "Please rate from 0 to 5",
        state: true,
      });
    }
  };

  return (
    <div className={cx("write-comment")}>
      <div className={cx("write-comment-text")}>Write your review here</div>
      <div className={cx("write-comment-rate")}>
        <span className={cx("write-comment-rate-text")}>Rate:</span>
        <input
          type="number"
          min="0"
          max="5"
          id="rate"
          ref={ref}
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
        <span className={cx("write-comment-rate-text")}>Comment:</span>
        <textarea
          type="text"
          className={cx("write-comment-content-input")}
          placeholder="Type something..."
          onChange={(e) => {
            setCmt({ ...cmt, comment: e.target.value });
          }}
        />
      </div>
      <button className={cx("write-comment-submit")} onClick={addComt}>
        <FontAwesomeIcon
          icon={faPaperPlane}
          className={cx("write-comment-icon")}
        />
        Send
      </button>
      <Noti noti={noti.noti} state={noti.state} />;
    </div>
  );
}

export default Comment;
