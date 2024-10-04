import { FC } from "react";

import styles from "./CartFooter.module.scss";

const CartFooter: FC = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div>Cart</div>
        <div>
          <span className={styles.cart}>
            <span className={styles.icon}></span>
            <span className={styles.number}>2</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartFooter;
