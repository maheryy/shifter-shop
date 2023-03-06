import { RouterProvider } from "react-router-dom";
import router from "./routes";
import AuthProvider from "./providers/AuthProvider";
import CartProvider from "./providers/CartProvider";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
