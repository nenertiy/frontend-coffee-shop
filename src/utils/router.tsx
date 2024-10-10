import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/Menu";
// import Categories from "../pages/Categories/Categories";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import Product from "../pages/Product/Product";
import Categories from "../pages/Categories/Categories";
import Category from "../pages/Category/Category";
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
      { path: "/product/:id", element: <Product /> },
      { path: "/products/category/:id", element: <Category /> },
      { path: "/categories", element: <Categories /> },
      { path: "/login", element: <Login /> },
      { path: "/registration", element: <Registration /> },
    ],
  },
]);

export default router;
