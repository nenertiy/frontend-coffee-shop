import { FC } from "react";
import { NavLink } from "react-router-dom";

import coffee from "../../assets/coffee.png";

import styles from "./ProductCard.module.scss";

const ProductCard: FC = () => {
  return (
    <div className={styles.container}>
      <NavLink
        to="/product/1"
        className={styles.img}>
        <img
          src={coffee}
          alt=""
        />
      </NavLink>
      <div className={styles.title}>Caffe</div>
      <div className={styles.subtitle}>Expresso</div>
      <div className={styles.container_price}>
        <div className={styles.price}>$ 4.53</div>
        <div>
          <button className={styles.button}>+</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
