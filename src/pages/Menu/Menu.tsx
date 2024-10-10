import { FC, useState } from "react";

import styles from "./Menu.module.scss";
import ProductCard from "../../components/ProductCard/ProductCard";
import Input from "../../components/Input/Input";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../utils/api";
import { useCreateStore } from "../../store/createStore";

const Menu: FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const productOpen = useCreateStore((state) => state.productOpen);
  const { data } = useQuery({
    queryKey: ["products", productOpen, searchValue],
    queryFn: () => fetchProducts(searchValue),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <Input
          value={searchValue}
          handleChange={handleChange}
        />
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
              category={product?.productCategory?.name}
            />
          )
        )}
      </div>
      <div className={styles.pagination}></div>
    </div>
  );
};

export default Menu;
