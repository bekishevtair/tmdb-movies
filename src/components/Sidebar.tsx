import { memo } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="relative w-2/12 rounded-2xl bg-black/20 p-4">
      <nav className="sticky flex flex-col gap-4">
        <Link to={"/"}>Homepage</Link>
        <Link to={"/my-library"}>My library</Link>
      </nav>
    </aside>
  );
};

export default memo(Sidebar);
