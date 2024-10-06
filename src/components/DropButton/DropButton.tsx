import { FC } from "react";

import styles from "./DropButton.module.scss";

interface DropButtonProps {
  handleCategory: () => void;
  handleSubcategory: () => void;
  handleProduct: () => void;
}

const DropButton: FC<DropButtonProps> = ({ handleCategory, handleSubcategory, handleProduct }) => {
  return (
    <div
      className={styles.dropdown}
      style={{ float: "right" }}>
      <button className={styles.dropbtn}>Create</button>
      <div className={styles.content}>
        <div onClick={handleSubcategory}>Subcategory</div>
        <div onClick={handleCategory}>Category</div>
        <div onClick={handleProduct}>Product</div>
      </div>
    </div>
  );
};

export default DropButton;
