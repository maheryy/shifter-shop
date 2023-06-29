import { TCategory } from "@shifter-shop/dictionary";
import api from ".";

export const getAllCategories = async (): Promise<TCategory[]> => {
  return api.get("/categories").json();
};
