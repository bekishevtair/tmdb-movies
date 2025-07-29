import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { memo } from "react";
const Layout = () => {
  return (
    <div className="flex min-h-dvh flex-col gap-6 p-4">
      <Header />
      <main className="flex flex-1 gap-6">
        <div className="w-full">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default memo(Layout);
