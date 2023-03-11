import { User } from "../types/user";

export const getUser = async (token: string): Promise<User> => {
  const user = {
    id: 1,
    firstname: "Donald",
    lastname: "Vogel",
    email: "donald.vogel@email.com",
    role: "user",
  };

  return user;
};

export const getAuthToken = async (
  email: string,
  password: string
): Promise<string> => {
  const token = "token";
  return token;
};
