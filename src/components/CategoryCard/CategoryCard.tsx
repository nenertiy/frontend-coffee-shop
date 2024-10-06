import { FC } from "react";
import { NavLink } from "react-router-dom";

import styles from "./CategoryCard.module.scss";

interface CategoryCardProps {
  img: string;
  name: string;
}

const CategoryCard: FC<CategoryCardProps> = ({ img, name }) => {
  return (
    <NavLink
      to="/"
      className={styles.container}>
      <img
        src={img}
        alt=""
      />
      <div className={styles.title}>{name}</div>
    </NavLink>
  );
};

export default CategoryCard;
