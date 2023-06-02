import users from "@data/users.json";
import { User } from "@/types/user";

export const getUser = async (token: string): Promise<User> => {
  const res = users.at(0)!;

  return res;
};

export const getAuthToken = async (
  email: string,
  password: string,
): Promise<string> => {
  const token = "token";

  return token;
};

type UserUpdate = Pick<User, "firstname" | "lastname" | "phone">;

export function updateUser(user: UserUpdate) {
  return Promise.reject(new Error("Not implemented"));
}

export function updatePassword(password: string) {
  return Promise.reject(new Error("Not implemented"));
}

export function hasAccount(email: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.email === email);

    return resolve(!!user);
  });
}
