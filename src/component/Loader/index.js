import HashLoader from "react-spinners/HashLoader";
import styles from "./Loader.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
function Loader() {
  return (
    <div className={cx("loader")}>
      {" "}
      <HashLoader
        color="#f4a7bb"
        size={60}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loader;
