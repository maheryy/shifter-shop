export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: number;
}

export interface ProductWithQuantity extends Product {
  quantity: number;
}
