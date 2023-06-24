import { TCategory } from "./category";
import { TReview } from "./review";
import { EGlobalStatus } from "./status";
import { TUserWithoutPassword } from "./user";

export interface TProduct {
  id: string;
  name: string;
  description: string;
  rating: number;
  price: number;
  image: string;
  categoryId: string;
  reviewsId: string[];
  sellerId: string;
  status: EGlobalStatus;
}

export interface TFullProduct {
  id: string;
  name: string;
  description: string;
  rating: number;
  price: number;
  image: string;
  categoryId: string;
  reviewsId: string[];
  sellerId: string;
  category: TCategory;
  reviews: TReview[];
  seller: TUserWithoutPassword;
  status: EGlobalStatus;
}

export interface TProductReferenceWithQuantity {
  id: string;
  quantity: number;
}

export interface TProductWithQuantity extends TProduct {
  quantity: number;
}
