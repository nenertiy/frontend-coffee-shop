import { FC } from "react";

import styles from "./Menu.module.scss";
import ProductCard from "../../components/ProductCard/ProductCard";
import Input from "../../components/Input/Input";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../utils/api";
import { useCreateStore } from "../../store/createStore";

const Menu: FC = () => {
  const productOpen = useCreateStore((state) => state.productOpen);
  const { data } = useQuery({
    queryKey: ["products", productOpen],
    queryFn: fetchProducts,
  });

  // console.log(data);

  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <Input />
      </div>
      <div className={styles.list}>
        {data?.map(
          (product: {
            id: string;
            name: string;
            img: string;
            price: number;
            productCategory: { name: string };
          }) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              img={product.img}
              price={product.price}
              category={product.productCategory.name}
            />
          )
        )}
      </div>
      <div className={styles.pagination}></div>
    </div>
  );
};

export default Menu;
