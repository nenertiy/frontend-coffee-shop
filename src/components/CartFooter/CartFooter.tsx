import { FC } from "react";
import { NavLink } from "react-router-dom";

import styles from "./CartFooter.module.scss";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../store/authStore";
import { fetchCart } from "../../utils/api";

const CartFooter: FC = () => {
  const userId = useAuthStore((state) => state.userId);

  const { data } = useQuery({
    queryKey: ["cart", userId],
    queryFn: () => fetchCart(userId),
    staleTime: 0,
  });

  let totalQ: number = 0;

  data?.cartProduct?.forEach((product: { quantity: number }) => {
    totalQ += product.quantity;
  });

  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <NavLink to="/cart" className={styles.title}>
          Cart
        </NavLink>
        <div>
          <NavLink to="/cart" className={styles.cart}>
            <span className={styles.icon}></span>
            <span className={styles.number}>{totalQ}</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default CartFooter;
