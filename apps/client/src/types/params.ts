import { Category } from "./category";

export interface ProductsSearchParams {
  categories?: Category["id"][];
  maxPrice?: number;
  minPrice?: number;
  q?: string;
  sortBy?: string;
}

export enum SortBy {
  POPULAR = "popular",
  LATEST = "latest",
  PRICE_ASC = "asc",
  PRICE_DESC = "desc",
}

export const SortTypeMapping: Record<SortBy, string> = {
  [SortBy.POPULAR]: "Popular",
  [SortBy.LATEST]: "Latest",
  [SortBy.PRICE_ASC]: "Price: Low to High",
  [SortBy.PRICE_DESC]: "Price: High to Low",
};
