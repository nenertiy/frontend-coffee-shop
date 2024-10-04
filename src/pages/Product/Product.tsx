import { FC } from "react";

import styles from "./Product.module.scss";

import coffee from "../../assets/coffee.png";

const Product: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.img}>
        <img
          src={coffee}
          alt=""
        />
      </div>
      <div className={styles.container_description}>
        <div className={styles.title}>Caffè Americano</div>
        <div className={styles.subtitle}>Hot coffee</div>
        <div className={styles.description}>
          Espresso shots topped with hot water create a light layer of crema culminating in this
          wonderfully rich cup with depth and nuance.
        </div>
      </div>
      <div className={styles.cart}>
        <div className={styles.price}>$ 4.53</div>
      </div>
    </div>
  );
};

export default Product;
