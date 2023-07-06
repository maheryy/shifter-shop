import { TCategory } from "@shifter-shop/dictionary";
import api from ".";

export const getAllCategories = async (): Promise<TCategory[]> => {
  return api.get("/categories").json();
};

export const createCategory = async (categoryData: Partial<TCategory>): Promise<TCategory> => {
  return api.post( categoryData ,"/categories").json();
};