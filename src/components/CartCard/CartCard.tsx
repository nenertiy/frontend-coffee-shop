import { FC } from "react";

import Minus from "../../assets/img/minusButton.svg";
import Plus from "../../assets/img/plusButton.svg";

import styles from "./CartCard.module.scss";

interface CartCardProps {
  id: number;
  name: string;
  img: string;
  price: number;
  quantity: number;
  userId: string | null;
}

const CartCard: FC<CartCardProps> = ({ img, name, quantity, price }) => {
  return (
    <div className={styles.container}>
      <div className={styles.img}>
        <img
          src={img}
          alt=""
        />
      </div>
      <div className={styles.description}>
        <div className={styles.name}>{name}</div>
        <div className={styles.category}>{}</div>
        <div className={styles.count}>
          <button className={styles.button}>
            <img
              src={Minus}
              alt=""
            />
          </button>
          <div className={styles.count_product}>{quantity}</div>
          <button className={styles.button}>
            <img
              src={Plus}
              alt=""
            />
          </button>
        </div>
        <div className={styles.price}>$ {price}</div>
      </div>
    </div>
  );
};

export default CartCard;
