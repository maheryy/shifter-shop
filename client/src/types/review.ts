import { Product } from "@/types/product";

export interface Review {
  id: number;
  rating: number;
  title?: string;
  details?: string;
  date: string;
  authorId: number;
  productId: number;
  orderId: number;
  product: Product;
}

export type CreateReview = Pick<Review, "rating" | "title" | "details">;
