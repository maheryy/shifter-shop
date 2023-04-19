import { Category } from "@/types/category";
import categories from "@data/categories.json";

export const getAllCategories = async (): Promise<Category[]> => {
  return categories;
};
