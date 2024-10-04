import { FC } from "react";
import styles from "./Input.module.scss";

const Input: FC = ({ value, handleChange }) => {
  return (
    <input
      type="text"
      className={styles.input}
      placeholder="Search"
    />
  );
};

export default Input;
