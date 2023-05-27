export interface Customer {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  profile: {
    address: string;
  };
}
