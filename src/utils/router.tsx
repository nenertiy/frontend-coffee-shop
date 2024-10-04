import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/Menu";
import Category from "../pages/Category/Category";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "/menu", element: <Menu /> },
      { path: "/category", element: <Category /> },
      { path: "/login", element: <Login /> },
      { path: "/registration", element: <Registration /> },
    ],
  },
]);

export default router;
