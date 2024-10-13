import { FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import styles from "./Header.module.scss";
// import { useIsCartStore } from "../../store/isCartStore";
import DropButton from "../DropButton/DropButton";
import { useCreateStore } from "../../store/createStore";
import { useAuthStore } from "../../store/authStore";
import { useQueryClient } from "@tanstack/react-query";

const Header: FC = () => {
  // const updateIsCart = useIsCartStore((state) => state.updateIsCart);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const categoryOpen = useCreateStore((state) => state.categoryOpen);
  const subcategoryOpen = useCreateStore((state) => state.subcategoryOpen);
  const productOpen = useCreateStore((state) => state.productOpen);

  const userId = useAuthStore((state) => state.userId);
  const authStatus = useAuthStore((state) => state.auth);
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    queryClient.invalidateQueries({ queryKey: ["cart", authStatus, userId] });
    navigate("/");
    logout();
  };

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.nav}>
          <NavLink to="/" className={styles.logo}>
            <span>CA</span>
            <span>FE</span>
          </NavLink>
          <div className={styles.list}>
            <NavLink to="/menu" className={styles.item}>
              Menu
            </NavLink>
            <NavLink to="/categories" className={styles.item}>
              Category
            </NavLink>
          </div>
        </div>

        <div className={styles.account}>
          {authStatus ? (
            <>
              {isAdmin && (
                <DropButton
                  handleCategory={() => categoryOpen()}
                  handleSubcategory={() => subcategoryOpen()}
                  handleProduct={() => productOpen()}
                />
              )}
              <button className={styles.logout} onClick={handleLogout}>
                log out
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/registration"
                // onClick={() => updateIsCart()}
                className={styles.sign_up}
              >
                sing up
              </NavLink>
              <NavLink
                // onClick={() => setAdmin(true)}
                to="/login"
                className={styles.sign_in}
              >
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
