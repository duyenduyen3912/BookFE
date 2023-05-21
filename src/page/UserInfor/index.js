import classNames from "classnames/bind";
import styles from "./UserInfor.module.scss";
import Form from "react-bootstrap/Form";
import { Image } from "cloudinary-react";
import { useEffect, useState } from "react";
import Loader from "../../component/Loader";
import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../component/Header";

const cx = classNames.bind(styles);

function UserInfor() {
  document.title = localStorage.getItem("username");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [cmt, setCmt] = useState({});
  const [validated, setValidated] = useState(false);
  const [click, setClick] = useState(0);
  const param = useParams();
  const navigate = useNavigate();
  const username = param.username;

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  const deleteImge = () => {
    setCmt({ ...cmt, img: null });
  };
  const onEditClick = () => {
    const element = document.getElementsByClassName("ip");
    for (let i = 0; i < element.length; i++) {
      document.getElementsByClassName("ip")[i].disabled = false;
    }
    document.getElementById("button").innerHTML = "Save";
    setClick(click + 1);
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1700);
  }, []);
  useEffect(() => {
    if (click > 1) {
      setValidated(true);
      const form = document.getElementById("submitForm");
      if (form.checkValidity() === true) {
        fetch("http://localhost:8080/user/update/" + user.username, {
          method: "post",
          mode: "cors",
          body: JSON.stringify({ ...user, username: username }),
          headers: {
            "Content-type": "application/json",
          },
        })
          .then((res) => res.json())

          .then((data) => {
            if (data.response === "successUpdate") window.location.reload();
            else {
              alert("Update không thành công");
            }
          });
      }
    }
  }, [click]);
  console.log(user);
  useEffect(() => {
    fetch(`http://localhost:8080/user/${username}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((err) => console.log(err));

    const element = document.getElementsByClassName("ip");
    for (let i = 0; i < element.length; i++) {
      document.getElementsByClassName("ip")[i].disabled = true;
    }
  }, []);
  console.log(click);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className={cx("wrapper")}>
            <div>
              <div className={cx("title")}>Hi, {user.username}</div>
              <br />
              <Form
                className="form-Detail"
                // action={id < 0 ? stringAdd : stringUpdate}
                // method="post"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                id="submitForm"
              >
                <div className={cx("form-wrapper")}>
                  <div className={cx("comment-detail")}>
                    <Form.Group controlId="validationCustom01">
                      <Form.Label className={cx("label-item")}>
                        Email*
                      </Form.Label>
                      <Form.Control
                        className={cx("input-text", "ip")}
                        required
                        type="text"
                        value={user.email}
                        id="email"
                        name="email"
                        onChange={(e) => {
                          setUser({ ...user, email: e.target.value });
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid Email.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <br />
                    <label for="detail" className={cx("label-item")}>
                      Fullname
                    </label>
                    <input
                      id="fullname"
                      name="fullname"
                      type="text"
                      value={user.fullname}
                      className={cx("input-text", "ip")}
                      onChange={(e) =>
                        setUser({ ...user, fullname: e.target.value })
                      }
                    />
                    <br />
                    <label for="detail" className={cx("label-item")}>
                      Address
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      value={user.address}
                      className={cx("input-text", "ip")}
                      onChange={(e) =>
                        setUser({ ...user, address: e.target.value })
                      }
                    />
                    <br />
                    <label for="detail" className={cx("label-item")}>
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      value={user.phone}
                      className={cx("input-text", "ip")}
                      onChange={(e) =>
                        setUser({ ...user, phone: e.target.value })
                      }
                    />
                    <br />
                    <label for="date" className={cx("label-item")}>
                      DOB
                    </label>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      value={user.date}
                      className={cx("input-text", "ip")}
                      onChange={(e) =>
                        setUser({ ...user, date: e.target.value })
                      }
                    />

                    <br />
                    <label for="password" className={cx("label-item")}>
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={user.password}
                      className={cx("input-text", "ip")}
                      onChange={(e) => {
                        console.log("h1");
                        setUser({ ...user, password: e.target.value });
                      }}
                    />
                  </div>
                  <div className={cx("book-image")}>
                    <input
                      id="img"
                      name="img"
                      type="file"
                      className={cx("input-image", "ip")}
                      onChange={(e) => {
                        const formData = new FormData();
                        formData.append("file", e.target.files[0]);
                        formData.append("upload_preset", "h7s6byie");
                        Axios.post(
                          "https://api.cloudinary.com/v1_1/dfcx62uhi/image/upload",
                          formData
                        ).then(
                          (response) =>
                            setUser({ ...user, img: response.data.secure_url })
                          // console.log(response)
                        );
                        console.log("upload");
                      }}
                    />

                    <br />

                    <Image
                      cloudName="dfcx62uhi"
                      publicId={user.img}
                      width="100%"
                      className={cx("img")}
                    />

                    <br />
                    <button
                      onClick={deleteImge}
                      className={cx("btn-custom", "ip")}
                    >
                      Delete Image
                    </button>
                  </div>
                </div>
                <div className={cx("btn-wrapper")}>
                  <button
                    onClick={onEditClick}
                    className={cx("btn-custom", "footer-btn")}
                    id="button"
                  >
                    {" "}
                    Edit
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UserInfor;
