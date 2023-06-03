import products from "@data/products.json";
import { ProductListParams } from "@/types/params";
import { Product, ProductWithQuantity } from "@/types/product";

export const getProducts = async (params?: ProductListParams) => {
  const shuffledProducts = getShuffledProducts();

  if (!params) {
    return shuffledProducts;
  }

  const byCategories = (product: Product) => {
    const { categories } = params;

    if (!categories || categories.length === 0) {
      return true;
    }

    return categories.includes(product.category);
  };

  const byMinPrice = (product: Product) => {
    const { minPrice } = params;

    if (!minPrice) {
      return true;
    }

    return product.price >= minPrice;
  };

  const byMaxPrice = (product: Product) => {
    const { maxPrice } = params;

    if (!maxPrice) {
      return true;
    }

    return product.price <= maxPrice;
  };

  const bySearch = (product: Product) => {
    const { q } = params;

    if (!q) {
      return true;
    }

    return new RegExp(q, "i").test(product.name);
  };

  return shuffledProducts
    .filter(byCategories)
    .filter(byMinPrice)
    .filter(byMaxPrice)
    .filter(bySearch);
};

export const getProduct = async (id: number): Promise<Product> => {
  const product = products.find((product) => product.id == id);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

export const getCartProducts = async (): Promise<ProductWithQuantity[]> => {
  return products.map((e) => ({ ...e, quantity: 1 })).slice(0, 4);
};

export const getRelatedProducts = async (id: number): Promise<Product[]> => {
  return getShuffledProducts().slice(0, 4);
};

// Temporary solution to shuffle hardcoded products
export const getShuffledProducts = (max?: number) => {
  return products
    .map((item) => ({ sort: Math.random(), value: item }))
    .sort((a, b) => a.sort - b.sort)
    .map((item) => item.value)
    .slice(0, max);
};
