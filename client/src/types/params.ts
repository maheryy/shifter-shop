import { Category } from "@/types/category";

export interface ProductListParams {
  categories?: Category["id"][];
  maxPrice?: number;
  minPrice?: number;
  q?: string;
  sortBy?: string;
}

export enum SortType {
  POPULAR = "popular",
  LATEST = "latest",
  PRICE_ASC = "asc",
  PRICE_DESC = "desc",
}

export const SortTypeMapping: Record<SortType, string> = {
  [SortType.POPULAR]: "Popular",
  [SortType.LATEST]: "Latest",
  [SortType.PRICE_ASC]: "Price: Low to High",
  [SortType.PRICE_DESC]: "Price: High to Low",
};
