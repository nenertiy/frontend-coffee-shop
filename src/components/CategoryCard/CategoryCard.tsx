import { FC } from "react";
import { NavLink } from "react-router-dom";
import coffee from "../../assets/coffee.png";

import styles from "./CategoryCard.module.scss";

const CategoryCard: FC = () => {
  return (
    <NavLink
      to="/"
      className={styles.container}>
      <img
        src={coffee}
        alt=""
      />
      <div className={styles.title}>Hot coffee</div>
    </NavLink>
  );
};

export default CategoryCard;
