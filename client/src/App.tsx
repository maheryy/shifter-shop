import { RouterProvider } from "react-router-dom";
import router from "@/routes";
import Providers from "@/providers";
import { ToastContainer } from "react-toastify";
import { Fragment } from "react";

const App = () => {
  return (
    <Fragment>
      <ToastContainer />
      <Providers>
        <RouterProvider router={router} />
      </Providers>
    </Fragment>
  );
};

export default App;
