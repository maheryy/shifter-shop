import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Fragment } from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Providers from "@/providers";
import router from "@/routes";

const queryClient = new QueryClient();

const App = () => {
  return (
    <Fragment>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <Providers>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </Providers>
      </QueryClientProvider>
    </Fragment>
  );
};

export default App;
