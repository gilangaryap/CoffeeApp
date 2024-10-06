import { createBrowserRouter } from "react-router-dom";
import User from "./page/layout/User";
import { Home } from "./page/home/Page";
import { Product } from "./page/product/Page";
import { ProductDetail } from "./page/productDetail/Page";

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
        path: "product",
        element: <Product/>
      },
      {
        path:"product-detail",
        element: <ProductDetail/>
      }
    ],
  },
]);
