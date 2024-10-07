import { FC } from "react";
import { NavLink } from "react-router-dom";

import plusIcon from "../../assets/img/plus.svg";

import styles from "./ProductCard.module.scss";

interface ProductCardProps {
  name: string;
  price: number;
  img: string;
  category: string;
  id: string;
}

const ProductCard: FC<ProductCardProps> = ({
  name,
  price,
  img,
  category,
  id,
}) => {
  return (
    <div className={styles.container}>
      <NavLink to={`/product/${id}`} className={styles.img}>
        <img src={img} alt="" />
      </NavLink>
      <div className={styles.title}>{name}</div>
      <div className={styles.subtitle}>{category}</div>
      <div className={styles.container_price}>
        <div className={styles.price}>$ {price}</div>
        <div>
          <button className={styles.button}>
            <img src={plusIcon} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
