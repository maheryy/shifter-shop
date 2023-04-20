import { RouterProvider } from "react-router-dom";
import router from "@/routes";
import Providers from "@/providers";

const App = () => {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
};

export default App;
