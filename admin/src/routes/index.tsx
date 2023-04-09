import { createBrowserRouter, RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import DefaultLayout from "../layouts/DefaultLayout";
import NotFound from "../pages/errors/NotFound";

const routes: RouteObject[] = [
  {
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/analytics",
        element: <div>Analytics</div>,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const router = createBrowserRouter(routes);

export default router;
