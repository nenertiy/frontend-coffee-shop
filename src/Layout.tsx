import { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import { useIsCartStore } from "./store/isCartStore";
import CartFooter from "./components/CartFooter/CartFooter";
import Modals from "./pages/Modals/Modals";

const Layout: FC = () => {
  const isCart = useIsCartStore((state) => state.isCart);

  return (
    <>
      <Header />
      <div style={{ height: "calc(100vh - 130px)" }}>
        <Outlet />
      </div>
      <Modals />
      {isCart && <CartFooter />}
    </>
  );
};

export default Layout;
