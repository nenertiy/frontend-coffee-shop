import { FC } from "react";
import { NavLink } from "react-router-dom";

import styles from "./CategoryCard.module.scss";

interface CategoryCardProps {
  img: string;
  name: string;
  id: number;
}

const CategoryCard: FC<CategoryCardProps> = ({ img, name, id }) => {
  return (
    <NavLink
      to={`/products/category/${id}`}
      className={styles.container}>
      <div className={styles.img}>
        <img
          src={img}
          alt=""
        />
      </div>
      <div className={styles.title}>{name}</div>
    </NavLink>
  );
};

export default CategoryCard;
