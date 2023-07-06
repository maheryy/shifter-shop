import { Category } from "./category";

export interface ProductsSearchParams {
  categoryId?: Category["id"][];
  maxPrice?: number;
  minPrice?: number;
  minRating?: number;
  maxRating?: number;
  q?: string;
  orderBy?: string;
  direction?: Direction;
  page?: number;
}

export type Direction = "ASC" | "DESC";

export enum EOrderBy {
  LASTEST = "createdAt",
  NAME = "name",
  RATING = "rating",
  PRICE = "price",
  REVIEW_COUNT = "reviewCount",
}

export const OrderByMap: Record<EOrderBy, string> = {
  [EOrderBy.LASTEST]: "Lastest",
  [EOrderBy.NAME]: "Name",
  [EOrderBy.RATING]: "Rating",
  [EOrderBy.REVIEW_COUNT]: "Reviews",
  [EOrderBy.PRICE]: "Price",
};
