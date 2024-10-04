import { FC } from "react";

import styles from "./Menu.module.scss";
import ProductCard from "../../components/ProductCard/ProductCard";
import Input from "../../components/Input/Input";

const Menu: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <Input />
      </div>
      <div className={styles.list}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      <div className={styles.pagination}></div>
    </div>
  );
};

export default Menu;
