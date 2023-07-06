import { EService, TFullProduct } from "@shifter-shop/dictionary";
import { fetchJson } from "@shifter-shop/helpers";

export const findAllProducts = async () => {
  const products = await fetchJson<TFullProduct[]>({
    service: EService.Product,
    endpoint: "/",
  });

  return products;
};
