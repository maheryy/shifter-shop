import { TCategory } from "./category";
import { EGlobalStatus } from "./status";
import { TUserWithoutPassword } from "./user";

export interface TProduct {
  id: string;
  name: string;
  description: string;
  rating: number;
  reviewCount: number;
  price: number;
  image: string;
  categoryId: string;
  sellerId: string;
  status: EGlobalStatus;
}

export interface TFullProduct extends TProduct {
  category: TCategory;
  seller: TUserWithoutPassword;
}

export interface TProductReferenceWithQuantity {
  id: string;
  quantity: number;
}

export interface TProductWithQuantity extends TProduct {
  quantity: number;
}
