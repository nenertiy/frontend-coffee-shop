import { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import { useIsCartStore } from "./store/isCartStore";
import CartFooter from "./components/CartFooter/CartFooter";

const Layout: FC = () => {
  const isCart = useIsCartStore((state) => state.isCart);

  return (
    <>
      <Header />
      <div style={{ height: "calc(100vh - 130px)" }}>
        <Outlet />
      </div>
      {isCart && <CartFooter />}
    </>
  );
};

export default Layout;
