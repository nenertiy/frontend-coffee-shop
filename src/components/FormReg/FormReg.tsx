import { FC } from "react";
import { NavLink } from "react-router-dom";

import styles from "./FormReg.module.scss";

const FormReg: FC = () => {
  return (
    <div className={styles.container}>
      <h2>Registration</h2>
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
        <div className={styles.name}>
          <input
            name="name"
            type="text"
            placeholder="Name"
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
            to="/login"
            className={styles.account}>
            Have an account?
          </NavLink>
        </div>
        <div className={styles.container_button}>
          <button className={styles.button}>Registrate</button>
        </div>
      </form>
    </div>
  );
};

export default FormReg;
