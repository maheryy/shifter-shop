import { EGlobalStatus, TCategory } from "@shifter-shop/dictionary";
import api from ".";

export const getAllCategories = async (): Promise<TCategory[]> => {
  return api.get("/categories").json();
};

export const createCategory = async (categoryData: Partial<TCategory>): Promise<TCategory> => {
  return api.post( categoryData ,"/categories").json();
};

export const categoryExists = async (categoryName: string): Promise<boolean> => {
  const categories = await getAllCategories();
  return categories.some((category) => category.name === categoryName);
};

export const setCategoryStatus = async (
  categoryId: string,
  status: EGlobalStatus
): Promise<void> => {
  return api.patch({ status }, `/categories/${categoryId}`).res();
}
