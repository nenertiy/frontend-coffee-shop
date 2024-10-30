import { FC, useState } from "react";

import styles from "./Menu.module.scss";
import ProductCard from "../../components/ProductCard/ProductCard";
import Input from "../../components/Input/Input";
import { useQuery } from "@tanstack/react-query";
import { addToCart, fetchProducts } from "../../utils/api";
import { useAuthStore } from "../../store/authStore";
import SkeletonProductCard from "../../components/ProductCard/SkeletonProductCard";

const Menu: FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const userId = useAuthStore((state) => state.userId);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["products", searchValue],
    queryFn: () => fetchProducts(searchValue),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const handleAddToCart = async (id: string) => {
    try {
      await addToCart(Number(userId), Number(id));
      alert("Product added to cart!");
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const arr = [...Array(5)];

  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <Input value={searchValue} handleChange={handleChange} />
      </div>
      <div className={styles.list}>
        {isLoading
          ? arr.map((_, index) => <SkeletonProductCard key={index} />)
          : isSuccess &&
            data?.map(
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
                  handleAddToCart={() => handleAddToCart(product.id)}
                />
              )
            )}
      </div>
      <div className={styles.pagination}></div>
    </div>
  );
};

export default Menu;
