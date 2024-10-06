import { FC, useState } from "react";
import { NavLink } from "react-router-dom";

import styles from "./Header.module.scss";
import { useIsCartStore } from "../../store/isCartStore";
import DropButton from "../DropButton/DropButton";
import { useCreateStore } from "../../store/createStore";

const Header: FC = () => {
  const updateIsCart = useIsCartStore((state) => state.updateIsCart);

  const categoryOpen = useCreateStore((state) => state.categoryOpen);
  const subcategoryOpen = useCreateStore((state) => state.subcategoryOpen);
  const productOpen = useCreateStore((state) => state.productOpen);

  const [isAdmin, setAdmin] = useState<boolean>(true);

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
          {isAdmin ? (
            <>
              <DropButton
                handleCategory={() => categoryOpen()}
                handleSubcategory={() => subcategoryOpen()}
                handleProduct={() => productOpen()}
              />
              <button
                className={styles.logout}
                onClick={() => setAdmin(false)}>
                log out
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/registration"
                onClick={() => updateIsCart()}
                className={styles.sign_up}>
                sing up
              </NavLink>
              <NavLink
                onClick={() => setAdmin(true)}
                to="/login"
                className={styles.sign_in}>
                sing in
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
