import { FC } from "react";
import styles from "./Input.module.scss";

interface InputProps {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({ value, handleChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      className={styles.input}
      placeholder="Search"
    />
  );
};

export default Input;
