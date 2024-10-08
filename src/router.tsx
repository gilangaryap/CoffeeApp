import { createBrowserRouter } from "react-router-dom";
import User from "./page/layout/User";
import { Home } from "./page/home/Page";
import { Product } from "./page/product/Page";
import { ProductDetail } from "./page/productDetail/Page";
import { CheckoutProduct } from "./page/checkout/Page";
import { HistoryOrder } from "./page/HistoryOrder/page";

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
        path:"detail-product/:uuid",
        element: <ProductDetail/>
      },
      {
        path:"checkout",
        element: <CheckoutProduct/>
      },
      {
        path:"history-order",
        element:<HistoryOrder/>
      }
    ],
  },
]);
