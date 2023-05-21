import classNames from "classnames/bind";
import Header from "../../component/Header";
import styles from "./Home.module.scss";
import Slider from "react-slick";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Image } from "cloudinary-react";
import Loader from "../../component/Loader";
import CategoryBook from "../../component/CategoryBook";
const cx = classNames.bind(styles);

function Home() {
  document.title = "Home";
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [highestBook, setHighestBook] = useState([]);
  const [categorySelected, setCategorySelected] = useState("");
  // const element = document.getElementsByClassName("title");
  // console.log(element);
  const selectCategory = (index, categorySelected) => {
    // console.log("ok");
    // var i;
    const listCategory = document.getElementsByClassName("list-category-item");
    console.log(listCategory);
    // console.log(listCategory);
    // for (i = 0; i < listCategory.length; i++) {
    //   listCategory[i].className = listCategory[i].className.replace(
    //     "list-category-active",
    //     ""
    //   );
    // }
    // listCategory.className += " list-category-active";
    // console.log(categorySelected);

    setCategorySelected(categorySelected);
  };

  const viewBook = (idBook) => {
    navigate(`/book-detail/${idBook}`);
  };

  const test = () => {
    const listCategory = document.getElementsByClassName("title");
    console.log(listCategory);
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1700);
  }, []);
  const ref = useRef({});
  const settings = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    dots: true,
  };
  useEffect(() => {
    fetch("http://localhost:8080/categories")
      .then((response) => response.json())

      .then((data) => setCategory(data))

      .catch((err) => console.log(err));

    fetch("http://localhost:8080/books/highest")
      .then((response) => response.json())

      .then((data) => setHighestBook(data))

      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={cx("wrapper")}>
          <Header />
          <div className={cx("container")}>
            <div className={cx("new-book")}>
              <div className={cx("title")}>Highly rated books</div>
              <Slider ref={ref} {...settings}>
                {highestBook.map((item) => {
                  return (
                    <div
                      className={cx("new-book-wrap")}
                      onClick={() => viewBook(item.idBook)}
                    >
                      <div className={cx("new-book-detail")}>
                        <div className={cx("new-book-detail-name")}>
                          {item.name}
                        </div>
                        <div className={cx("new-book-detail-author")}>
                          {item.author}
                        </div>
                        <div className={cx("new-book-detail-text")}>
                          {item.detail}
                        </div>
                        <div className={cx("new-book-detail-rating")}>
                          Rating: {item.rating}/5
                        </div>
                      </div>
                      <div className={cx("new-book-image")}>
                        <Image
                          cloudName="dfcx62uhi"
                          publicId={item.image}
                          width="100%"
                          className={cx("book-image")}
                        />
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
            <div className={cx("books")}>
              <div className={cx("title")}>List book</div>

              <div className={cx("list-book-wrap")}>
                <div className={cx("list-category")}>
                  <a
                    className={cx("list-category-item")}
                    onClick={() => setCategorySelected("")}
                    id="all"
                  >
                    ALL
                  </a>
                  {category.map((item, index) => {
                    return (
                      <a
                        key={index}
                        className={cx("list-category-item")}
                        onClick={() => selectCategory(index, item.response)}
                        id={item.response}
                      >
                        {item.response.toUpperCase()}
                      </a>
                    );
                  })}
                </div>

                <CategoryBook viewCategory={categorySelected} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
