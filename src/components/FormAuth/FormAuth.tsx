import { FC } from "react";
import { NavLink } from "react-router-dom";

import styles from "./FormAuth.module.scss";

const FormAuth: FC = () => {
  return (
    <div className={styles.container}>
      <h2>Sign in</h2>
      <form
        className={styles.form}
        onSubmit={() => console.log("submit")}>
        <div className={styles.email}>
          <input
            name="email"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className={styles.password}>
          <input
            name="password"
            type="password"
            placeholder="Password"
          />
        </div>
        <div>
          <NavLink
            to="/registration"
            className={styles.account}>
            Don't have account?
          </NavLink>
        </div>
        <div className={styles.container_button}>
          <button className={styles.button}>Sign in</button>
        </div>
      </form>
    </div>
  );
};

export default FormAuth;
