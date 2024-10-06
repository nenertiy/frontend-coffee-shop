import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "react-widgets/scss/styles.scss";
import "./reset.scss";

createRoot(document.getElementById("root")!).render(<App />);

