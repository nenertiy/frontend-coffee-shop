import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "./utils/router";

import styles from "./App.module.scss";

const queryClient = new QueryClient();

function App() {
  return (
    <div className={styles.App}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
