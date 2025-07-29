import { memo } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between">
      <Link to={"/"}>
        <img className="w-[140px]" src="../../images/logo/netflix.png" alt="" />
      </Link>
      <nav className="flex gap-4">
        <Link to={"/"}>Homepage</Link>
        <Link to={"/my-library"}>My library</Link>
      </nav>
    </header>
  );
};

export default memo(Header);
