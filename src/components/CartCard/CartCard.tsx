import { FC } from "react";

import Minus from "../../assets/img/minusButton.svg";
import Plus from "../../assets/img/plusButton.svg";

import styles from "./CartCard.module.scss";
import { decreaseQuantity, removeFromCart } from "../../utils/api";
import { useQueryClient } from "@tanstack/react-query";

interface CartCardProps {
  id: number;
  name: string;
  img: string;
  price: number;
  quantity: number;
  userId: string | null;
  refetch: () => void;
}

const CartCard: FC<CartCardProps> = ({
  img,
  name,
  quantity,
  price,
  id,
  userId,
  refetch,
}) => {
  const queryClient = useQueryClient();

  const handleDecrease = async () => {
    if (userId) {
      if (quantity === 1) {
        await removeFromCart(userId, id);
      } else {
        await decreaseQuantity(userId, id, 1);
      }
      queryClient.invalidateQueries({
        queryKey: ["cart", userId],
      });
      refetch();
    }
  };

  const handleIncrease = async () => {
    if (userId) {
      await decreaseQuantity(userId, id, -1);
    }
    queryClient.invalidateQueries({
      queryKey: ["cart", userId],
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.img}>
        <img src={img} alt="" />
      </div>
      <div className={styles.description}>
        <div className={styles.name}>{name}</div>
        <div className={styles.category}>{}</div>
        <div className={styles.count}>
          <button className={styles.button} onClick={handleDecrease}>
            <img src={Minus} alt="" />
          </button>
          <div className={styles.count_product}>{quantity}</div>
          <button className={styles.button} onClick={handleIncrease}>
            <img src={Plus} alt="" />
          </button>
        </div>
        <div className={styles.price}>
          $ {Math.round(price * quantity * 10) / 10}
        </div>
      </div>
    </div>
  );
};

export default CartCard;
