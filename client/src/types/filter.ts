import { Category } from "./category";

export interface ProductListFilters {
  q?: string;
  categories?: Category["id"][];
  minPrice?: number;
  maxPrice?: number;
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
