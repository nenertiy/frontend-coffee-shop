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
      <Outlet />
      {isCart && <CartFooter />}
    </>
  );
};

export default Layout;
