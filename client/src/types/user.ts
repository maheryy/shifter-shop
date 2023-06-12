import { Address } from "./address";

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  role: string;
  addresses: Address[];
}
