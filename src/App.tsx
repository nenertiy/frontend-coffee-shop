import { RouterProvider } from "react-router-dom";
import router from "./utils/router";

import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.App}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

