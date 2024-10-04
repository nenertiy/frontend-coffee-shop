import { FC } from "react";

import styles from "./Registration.module.scss";
import FormReg from "../../components/FormReg/FormReg";

const Registration: FC = () => {
  return (
    <div className={styles.Registration}>
      <div className={styles.container}>
        <FormReg />
      </div>
    </div>
  );
};

export default Registration;
