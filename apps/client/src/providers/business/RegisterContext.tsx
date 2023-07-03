import { createContext, useState } from "react";

interface State {
  email: string;
  password: string;
  phoneNumber: string;
  business: {
    name: string;
    address: {
      line1: string;
      line2?: string;
      zip: string;
      city: string;
      state: string;
    };
  };
}

const initialState = {
  email: "",
  password: "",
  phoneNumber: "",
  business: {
    name: "",
    address: {
      line1: "",
      line2: "",
      zip: "",
      city: "",
      state: "",
    },
  },
};

type RegisterContext = [State, React.Dispatch<React.SetStateAction<State>>];

export const RegisterContext = createContext<RegisterContext | null>(null);

interface RegisterProviderProps {
  children: React.ReactNode;
}

const RegisterProvider = ({ children }: RegisterProviderProps) => {
  const value = useState<State>(initialState);

  return (
    <RegisterContext.Provider value={value}>
      {children}
    </RegisterContext.Provider>
  );
};

export default RegisterProvider;
