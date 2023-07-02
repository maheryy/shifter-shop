import api from "@/api";
import { Category } from "@/types/category";

export function getCategories(): Promise<Category[]> {
  return api.get("/categories").json();
}
