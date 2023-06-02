import { Fragment } from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Providers from "@/providers";
import router from "@/routes";

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
