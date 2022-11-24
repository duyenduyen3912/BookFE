import classNames from "classnames/bind";
import styles from "./ListBook.module.scss";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ActButton from "../../component/Button";
import Add from "../../component/AddBtn";
import Logout from "../../component/LogoutBtn";
import Login from "../../component/LoginBtn";
import { Image } from "cloudinary-react";

const cx = classNames.bind(styles);
function ListBook() {
  const [book, setBook] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/books")
      .then((response) => response.json())

      .then((data) => setBook(data))

      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("title")}>List book</div>
      <div>{localStorage.getItem("isLogin") ? <Logout /> : <Login />}</div>
      <div className={cx("table-row")}>
        <table className={cx("table-custom")}>
          <thead>
            <th className={cx("table-item")}>Index</th>
            <th className={cx("table-item")}>Name</th>
            <th className={cx("table-item")}>Author</th>
            <th className={cx("table-item")}>Detail</th>
            <th className={cx("table-item")}>Date</th>
            <th className={cx("table-item")}>Page number</th>
            <th className={cx("table-item")}>Category</th>
            <th className={cx("table-item")}>Image</th>
            <th className={cx("table-item")}>Action</th>
          </thead>
          <tbody>
            {book.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td className={cx("table-body")}>{++index}</td>
                  <td className={cx("table-body")}>{item.name}</td>
                  <td className={cx("table-body")}>{item.author}</td>
                  <td className={cx("table-body")}>{item.detail}</td>
                  <td className={cx("table-body")}>{item.date}</td>
                  <td className={cx("table-body")}>{item.pagenumber}</td>
                  <td className={cx("table-body")}>{item.category}</td>
                  <td className={cx("table-body")}>
                    <Image
                      cloudName="dfcx62uhi"
                      publicId={item.image}
                      width="100%"
                      className={cx("image-book")}
                    />
                  </td>

                  <td className={cx("table-body")}>
                    {localStorage.getItem("isLogin") ? (
                      <ActButton id={item.id} />
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {localStorage.getItem("isLogin") ? <Add /> : null}
    </div>
  );
}

export default ListBook;
