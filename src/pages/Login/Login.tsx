import { FC } from "react";

import styles from "./Login.module.scss";
import FormAuth from "../../components/FormAuth/FormAuth";

const Login: FC = () => {
  return (
    <div className={styles.Login}>
      <div className={styles.container}>
        <FormAuth />
      </div>
    </div>
  );
};

export default Login;
