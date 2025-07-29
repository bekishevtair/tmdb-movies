import { memo } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex flex-col">
      <div className="mb-4">
        <Link to={"/"}>
          <img
            className="w-[140px]"
            src="../../images/logo/netflix.png"
            alt=""
          />
        </Link>
      </div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime nam
        doloribus fugit rerum? Natus enim, deleniti laboriosam ducimus deserunt
        corporis, unde modi quisquam dolor ut ullam iusto iure delectus
        corrupti!
      </div>
    </footer>
  );
};

export default memo(Footer);
