import { FC } from "react";

import styles from "./Product.module.scss";

// import coffee from "../../assets/coffee.png";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../../utils/api";

const Product: FC = () => {
  const { id } = useParams();

  const { data, isSuccess } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    // enabled: !!id,
  });

  console.log(data);

  return (
    <div className={styles.container}>
      {isSuccess && (
        <>
          <div className={styles.img}>
            <img src={data.img} alt="" />
          </div>
          <div className={styles.container_description}>
            <div className={styles.title}>{data.name}</div>
            <div className={styles.subtitle}>{data.productCategory.name}</div>
            <div className={styles.description}>{data.description}</div>
          </div>
          <div className={styles.cart}>
            <div className={styles.price}>$ {data.price}</div>
            <div className={styles.size}>500ml</div>
            <div className={styles.button_container}>
              <button className={styles.button}>Add to cart</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
