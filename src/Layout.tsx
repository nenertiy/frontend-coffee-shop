import { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import CartFooter from "./components/CartFooter/CartFooter";
import Modals from "./pages/Modals/Modals";
import { useAuthStore } from "./store/authStore";

const Layout: FC = () => {
  const isAuth = useAuthStore((state) => state.auth);

  return (
    <>
      <Header />
      <div style={{ height: "calc(100vh - 130px)" }}>
        <Outlet />
      </div>
      <Modals />
      {isAuth && <CartFooter />}
    </>
  );
};

export default Layout;
