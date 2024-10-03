import { createBrowserRouter } from "react-router-dom";
import User from "./page/layout/User";
import { Home } from "./page/home/Page";

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
    ],
  },
]);
