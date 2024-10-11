import { FC } from "react";

import styles from "./Cart.module.scss";
import CartCard from "../../components/CartCard/CartCard";
import { useQuery } from "@tanstack/react-query";
import { fetchCart } from "../../utils/api";
import { useAuthStore } from "../../store/authStore";

const Cart: FC = () => {
  const userId = useAuthStore((state) => state.userId);

  const { data, isSuccess } = useQuery({
    queryKey: ["cart", userId],
    queryFn: () => fetchCart(userId),
  });

  return (
    <div className={styles.container}>
      <h2>Your order</h2>
      <div className={styles.cart}>
        <div className={styles.cart_list}>
          {isSuccess && data?.cartProduct?.length > 0 ? (
            data?.cartProduct.map(
              (product: {
                product: { id: number; img: string; price: number; name: string };
                quantity: number;
              }) => (
                <CartCard
                  key={product.product.id}
                  img={product.product.img}
                  price={product.product.price}
                  name={product.product.name}
                  quantity={product.quantity}
                  id={product.product.id}
                  userId={userId}
                />
              )
            )
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
