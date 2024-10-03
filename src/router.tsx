import { createBrowserRouter } from "react-router-dom";
import User from "./page/layout/User";
import { Home } from "./page/home/Page";
import { Product } from "./page/product/Page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <User />,
    errorElement: <h1>Error</h1>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "product/:uuid",
        element: <Product/>
      }
    ],
  },
]);
