import classNames from "classnames/bind";
import Header from "../../component/Header";
import styles from "./Home.module.scss";
import Slider from "react-slick";
import { useRef, useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Image } from "cloudinary-react";
import Loader from "../../component/Loader";
import CategoryBook from "../../component/CategoryBook";
const cx = classNames.bind(styles);

function Home() {
  document.title = "Home";
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const [categorySelected, setCategorySelected] = useState("");
  // const element = document.getElementsByClassName("title");
  // console.log(element);
  const selectCategory = (index, categorySelected) => {
    // console.log("ok");
    // var i;
    // var listCategory = document.getElementsByClassName("title");
    // console.log(listCategory);
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
              <div className={cx("title")}>New Book</div>
              <Slider ref={ref} {...settings}>
                <div className={cx("new-book-wrap")}>
                  <div className={cx("new-book-detail")}>
                    <div className={cx("new-book-detail-name")}>Doraemon</div>
                    <div className={cx("new-book-detail-author")}>
                      Fujiko F. Fujio
                    </div>
                    <div className={cx("new-book-detail-text")}>
                      Doraemon là nhân vật chính hư cấu trong loạt Manga cùng
                      tên của họa sĩ Fujiko F. Fujio. Trong truyện lấy bối cảnh
                      ở thế kỷ 22, Doraemon là chú mèo robot của tương lai do
                      xưởng Matsushiba — công xưởng chuyên sản xuất robot vốn dĩ
                      nhằm mục đích chăm sóc trẻ nhỏ.
                    </div>
                  </div>
                  <div className={cx("new-book-image")}>
                    <img
                      src={require("../../image/Doraemon1.jpg")}
                      className={cx("book-image")}
                    />
                  </div>
                </div>
                <div className={cx("new-book-wrap")}>
                  <div className={cx("new-book-detail")}>
                    <div className={cx("new-book-detail-name")}>Doraemon</div>
                    <div className={cx("new-book-detail-author")}>
                      Fujiko F. Fujio
                    </div>
                    <div className={cx("new-book-detail-text")}>
                      Doraemon là nhân vật chính hư cấu trong loạt Manga cùng
                      tên của họa sĩ Fujiko F. Fujio. Trong truyện lấy bối cảnh
                      ở thế kỷ 22, Doraemon là chú mèo robot của tương lai do
                      xưởng Matsushiba — công xưởng chuyên sản xuất robot vốn dĩ
                      nhằm mục đích chăm sóc trẻ nhỏ.
                    </div>
                  </div>
                  <div className={cx("new-book-image")}>
                    <img
                      src={require("../../image/Doraemon1.jpg")}
                      className={cx("book-image")}
                    />
                  </div>
                </div>
              </Slider>
            </div>
            <div className={cx("books")}>
              <div className={cx("title")}>List book</div>

              <div className={cx("list-book-wrap")}>
                <div className={cx("list-category")}>
                  <a
                    className={cx("list-category-item")}
                    onClick={() => setCategorySelected("")}
                  >
                    ALL
                  </a>
                  {category.map((item, index) => {
                    return (
                      <a
                        key={index}
                        className={cx("list-category-item")}
                        onClick={() => selectCategory(index, item.response)}
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
