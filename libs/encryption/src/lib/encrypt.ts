import { compare, hash } from "bcrypt";

export const verifyPassword = (password: string, hashedPassword: string) => {
  return compare(password, hashedPassword);
};

export const hashPassword = (password: string) => {
  return hash(password, 10);
};
