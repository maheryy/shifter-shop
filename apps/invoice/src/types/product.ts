export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface ProductWithQuantity {
  product: Product;
  quantity: number;
}
