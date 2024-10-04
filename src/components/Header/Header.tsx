import { FC } from "react";
import { NavLink } from "react-router-dom";

import styles from "./Header.module.scss";
import { useIsCartStore } from "../../store/isCartStore";

const Header: FC = () => {
  const updateIsCart = useIsCartStore((state) => state.updateIsCart);

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.nav}>
          <NavLink
            to="/"
            className={styles.logo}>
            <span>CA</span>
            <span>FE</span>
          </NavLink>
          <div className={styles.list}>
            <NavLink
              to="/menu"
              className={styles.item}>
              Menu
            </NavLink>
            <NavLink
              to="/categories"
              className={styles.item}>
              Category
            </NavLink>
          </div>
        </div>

        <div className={styles.account}>
          <NavLink
            to="/registration"
            onClick={() => updateIsCart()}
            className={styles.sign_up}>
            sing up
          </NavLink>
          <NavLink
            to="/login"
            className={styles.sign_in}>
            sing in
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
