import { FC } from "react";

import styles from "./Categories.module.scss";
// import ProductCard from "../../components/ProductCard/ProductCard";
import CategoryCard from "../../components/CategoryCard/CategoryCard";

const Categories: FC = () => {
  return (
    <div className={styles.Category}>
      <div className={styles.container}>
        <div className={styles.categories}>
          <div className={styles.title}>Drinks</div>
          <div className={styles.line}></div>
          <div className={styles.list}>
            {/* <ProductCard /> */}
            <CategoryCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
