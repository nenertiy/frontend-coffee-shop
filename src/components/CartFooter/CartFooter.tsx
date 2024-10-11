import { FC } from "react";
import { NavLink } from "react-router-dom";

import styles from "./CartFooter.module.scss";

const CartFooter: FC = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div>Cart</div>
        <div>
          <NavLink
            to="/cart"
            className={styles.cart}>
            <span className={styles.icon}></span>
            <span className={styles.number}></span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default CartFooter;
